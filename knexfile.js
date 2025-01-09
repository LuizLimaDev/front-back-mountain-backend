require("dotenv").config();
const path = require("path");

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: path.resolve(__dirname, "src", "sql", "database.sqlite3"),
		},
		useNullAsDefault: true,
		migrations: {
			directory: __dirname + "/migrations",
		},
	},
	production: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
		},
		useNullAsDefault: true,
		ssl: {
			require: true,
		},
		migrations: {
			directory: __dirname + "/migrations",
		},
	},
};
