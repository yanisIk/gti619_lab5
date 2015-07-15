Logs = new Errors = new Mongo.Collection("logs");

/*

schema :

{
	level: String ["INFO", "WARN"]
	type: String ["ACCOUNTS", ""] 
	when: Date
	message: String
}

*/