//At each login attempt, verify if the email is verified, if not, send verification email.
Accounts.validateLoginAttempt(function(attempt){
  
  if(getUseTwoFactorsAuth()){
    //If admin, let him connect
    if(attempt.user && !Roles.userIsInRole(attempt.user._id, ['admin'])){
      if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        console.log('identity not verified by email, sending email to '+attempt.user.emails[0].address);
        Accounts.sendVerificationEmail(attempt.user._id);
        throw new Meteor.Error(403, "Two Factors Auth : An email has been sent to verify your identity");
      }
    }
    return true;
  }
  else{
    return true;
  }
  
}); 

//On each logout, unverify email
UserStatus.events.on("connectionLogout", function(fields) { 
    if(getUseTwoFactorsAuth()){
      unverifyEmailForUser(fields.userId);
      console.log("unverified email for userid "+fields.userId);
    } 
});

//Called at each logout
unverifyEmailForUser = function(userId){
    check(userId, String);
    if(Meteor.users.find(userId).count() == 0){
        throw new Meteor.Error(500, "User not found");
    }
    Meteor.users.update({"_id": userId, "emails.verified": true}, {$set : {"emails.$.verified": false}});
}


Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'GTI619 LAB5 <yanisgti619@gmail.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'GTI619 LAB5';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Verify your identity';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'click on the following link to verify your identity and login: ' + url;
  };
});

Meteor.methods({
  "setTwoFactorsAuth": function(bool, authPassword){
    check(bool, Boolean);
    check(authPassword, String);

    if(!this.userId){
      throw new Meteor.Error(403, "You must login as admin first");
    }
    if(!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error(403, "Not authorized to create new users");
    }
    var loggedInUsername = Meteor.users.findOne(this.userId).username;
    if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      throw new Meteor.Error(403, "ReAuth password invalid");
    }
    setTwoFactorAuth(bool);
    this.unblock();

    var ip = this.connection.clientAddress;
    var log = {
      level: "WARN",
      type: "SECURITY_CONFIG",
      action: "TWOFACTORSAUTH_CHANGE",
      username: loggedInUsername,
      ipAddress: ip,
      time: new Date(),
      message: "User "+loggedInUsername+" with IP "+ip+" changed TwoFactorsAuth to: "+bool+" at: "+new Date()
    }
    Logs.insert(log)
  }
});


Meteor.startup(function () {
  smtp = {
    username: 'yanisgti619@gmail.com',  
    password: 'gti619yanis',   
    server:   'smtp.gmail.com',  
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});