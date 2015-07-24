Projet réalisé à l'aide du framework Meteor.

- Installer Meteor
- Via terminal, aller dans le dossier du projet
- Lancer la commande suivante : meteor --settings settings.json
- L'application est prête sur localhost:3000

AVAILABLE METEOR METHODS FOR ADMIN :

Bruteforce
-setMaxLoginAttemptsPerIp(numberOfAttempts, authPassword)
-setAuthDelayAfterMaxAttempts(delayInSeconds, authPassword)
-unlockUserAndResetPasswordByEmail(username, authPassword)
-unlockUserAndResetPassword(username, password, authPassword)

Roles :
-addUserToRoles(username, roles, authPassword)
-updateRolesToUser(username, roles, authPassword)

Accounts and Passwords :
-adminCreateUser(username, email, role, authPassword)
-adminCreateUserWithPassword(username, password, email, role, authPassword)
-customResetPassword(oldPassword, newPassword); NO NEED TO BE ADMIN FOR IT
-setTwoFactorsAuth(bool, authPassword)


USE CASES :

Meteor.call("adminCreateUserWithPassword", "userTest1", "pass123", "userTest1@yopmail.com", "prepose au cercle", "gti619");
Meteor.call("adminCreateUser", "userTest1", "userTest1@yopmail.com", "prepose au cercle", "gti619");
Meteor.call("customResetPassword", "gti619", "gti619");
Meteor.call("setTwoFactorsAuth", true, "gti619");

Meteor.call("addUserToRoles", "utilisateur1", ["admin"], "gti619");
Meteor.call("addUserToRoles", "utilisateur1", ["prepose au cercle"], "gti619");

Meteor.call("setMaxLoginAttemptsPerIp", 3, "gti619");
Meteor.call("setAuthDelayAfterMaxAttempts", 20, "gti619");
Meteor.call("unlockUserAndResetPasswordByEmail", "utilisateur1", "gti619");
Meteor.call("unlockUserAndResetPassword", "utilisateur1", "gti619" "gti619");