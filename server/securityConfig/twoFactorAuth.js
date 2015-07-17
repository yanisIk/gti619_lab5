//Allow only login attempts with some methods
Accounts.validateLoginAttempt(function(attempt){  
    var allowed = [  
        'login',
        'verifyEmail',
        'resetPassword'
    ];
    if (_.contains(allowed, attempt.methodName) && attempt.type == 'resume'){
        return true;
    }
    return false;
});


//Login procedure method:
Meteor.methods({  
    'LoginProcedure': function(username, pswdDigest, code, hash){
        //Validate args
        check(username, String);
        check(pswdDigest, String);
        check(code, String);
        check(hash, String);

        //Now check if user already exists
        var user = Meteor.users.findOne({
            '$or': [
            {
                'username': username
            },
            {
                'emails.address': username
            }
            ]
        });
        if (!user)
            throw new Meteor.Error(404, 'fail');
        //Now password checks
        //Explanations about this are right after the code
        var password = {digest: pswdDigest, algorithm: 'sha-256'};
        var pswdCheck = Accounts._checkPassword(user, password);
        if (pswdCheck.error)
            throw new Meteor.Error(403,'fail');
        //Next check if two-factor is enabled
        //If it's not, just generate token and return it
        //Else start the procedure...
        if (!user.twoFactorEnabled){
            //Use function defined above
            return saveLoginToken(user._id);
        }else{
            if (code && hash){
                //Step 6-7
                
            }else(hash){
                //That part is for continuing previous session
                //New code will not be sent, but client-side app
                //will receive special code and open the pop-up
                var session = TwoFactorSessions.findOne({
                    hash: hash,
                    username: username
                });
                if (session){
                    //Lets use some imaginary validation function
                    //that you will define by your own in your project
                    validateSession(session, user);
                    return [401, hash];
                }else{
                    // Couldnt find, return error
                    throw new Meteor.Error(404, 'No session');
                }
            }else{
                //Generated code, i'll leave it up to you
                var newCode = 1234;
                //The now date can be used as hash, just timestamp
                var now = new Date();
                var hash = +now;
                //Save it to special collection for suspended sign-in processes
                TwoFactorSessions.insert({
                    hash: hash,
                    code: newCode,
                    username: username,
                    sent: now
                });
                // Wrap async task
                return Meteor.wrapAsync(function(user, hash, code, startTime, cb){
                    // Send code using Twilio to the phone number of user
                    Twilio.messages.create({
                        to: user.phone,
                        from: '+000000000000',
                        body: 'Hi! Code - '+code
                    }, function(error, message){
                        if (error){
                            // Return error with Twilio
                            cb && cb(new Meteor.Error(500, 'Twilio error'));
                        }else{
                            // Return 403, saying that SMS has been sent
                            // hash, which user will send to us with code to identify his TF session
                            cb && cb(null, [403, hash]);
                        }
                    });
                })(user, hash, newCode, now);
            }
        }
       
    
});


//Util
var generateLoginToken = function(){  
    var stampedToken = Accounts._generateStampedLoginToken();
    return [
        stampedToken,
        Accounts._hashStampedToken(stampedToken)
    ];
};

var saveLoginToken = function(userId){  
    return Meteor.wrapAsync(function(userId, tokens, cb){
        // In tokens array first is stamped, second is hashed
        // Save hashed to Mongo
        Meteor.users.update(userId, {
            $push: {
                'services.resume.loginTokens': tokens[1]
            }
        }, function(error){
            if (error){
                cb(new Meteor.Error(500, 'Couldnt save login token into user profile'));
            }else{
                // Return stamped to user
                cb && cb(null, [200,tokens[0].token]);
            }
        });
    })(userId, generateLoginToken());
};