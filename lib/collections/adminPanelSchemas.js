SimpleSchema.messages({
  "passwordMismatch": "Passwords do not match",
  "invalidPassword": "Password is invalid",
  "usernameTaken": "This username is already taken",
  "usernameNotFound": "This username doesn't exist"
});

UserCreationSchema = new SimpleSchema({
    "username": {
         type: String,
         label: "Username",
		 custom: function () {
		    if (Meteor.isClient && this.isSet) {
		      Meteor.call("isUsernameAvailable", this.value, function (error, result) {
		        if (!result) {
		          return "usernameTaken";
		        }
		      });
    		}
  		}
    },
    "email": {
    	type: String,
    	label: "Email",
    	regEx: SimpleSchema.RegEx.Email
    },
    "role": {
    	type: String,
    	label: "Select a role",
    	allowedValues: Roles.getAllRoles().fetch(),
    	autoform: {
      		afFieldInput: {
        	firstOption: "(Select a role)"
      		}
    	}
    },
    "authPassword" : {
    	type: String,
    	label: "Your password (for security reason)"
    }

});

UserRoleSchema = new SimpleSchema({
    "username": {
         type: String,
         label: "Username",
		 custom: function () {
		    if (Meteor.isClient && this.isSet) {
		      Meteor.call("isUsernameAvailable", this.value, function (error, result) {
		        if (result) {
		          return "usernameNotFound";
		        }
		      });
    		}
  		}
    },
    "role": {
    	type: String,
    	label: "Select a role",
    	allowedValues: Roles.getAllRoles().fetch(),
    	autoform: {
      		afFieldInput: {
        	firstOption: "(Select a role)"
      		}
    	}
    },
    "authPassword" : {
    	type: String,
    	label: "Your password (for security reason)"
    }

});

PasswordPoliticsSchema = new SimpleSchema({
    "minChars": {
    	type: Number,
    	label: "Minimum number of characters",
    	defaultValue: getMinimumCharactersNumber
    },
    "requireCapital": {
    	type: Boolean,
    	label: "Require a capital letter ?",
    	defaultValue: getUseCapitalCase
    },
    "requireNumbers": {
    	type: Boolean,
    	label: "Require numbers ?",
    	defaultValue: getUseNumbers
    },
    "requireSpecialCharacter": {
    	type: Boolean,
    	label: "Require special character ?",
    	defaultValue: getUseSpecialCharacter
    },
    "authPassword" : {
    	type: String,
    	label: "Your password (for security reason)"
    }

});