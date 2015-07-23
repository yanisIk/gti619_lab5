Projet réalisé à l'aide du framework Meteor.

- Installer Meteor
- Via terminal, aller dans le dossier du projet
- Lancez la commande suivante : meteor --settings settings.json
- L'application est prête sur localhost:3000

AVAILABLE METEOR METHODS FOR ADMIN :

Bruteforce
-setMaxLoginAttemptsPerIp(numberOfAttempts)
-setAuthDelayAfterMaxAttempts(delayInSeconds)
-unlockUserAndResetPasswordByEmail(username)

Roles :
-addUserToRoles(userId, roles)
-updateRolesToUser(userId, roles)