const path = require("path");

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: path.resolve(__dirname, "src", "sql", "database.sqlite3"),
		},
		useNullAsDefault: true,
	},
	production: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true,
		},
		useNullAsDefault: true,
		ssl: {
			require: true,
		},
	},
};
