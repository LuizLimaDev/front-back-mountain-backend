// const { config } = require("dotenv");
// const { knex } = require("knex");
// const knexfile = require("../../knexfile");
// config();

// const environment = process.env.NODE_ENV || "development";
// const ConfigDb = knexfile[environment];

// module.exports = knex(ConfigDb);

const knex = require("knex")({
	client: "pg",
	connection: {
		host: "localhost",
		user: "postgres",
		password: "7287",
		database: "testing-semcalote",
	},
	useNullAsDefault: true,
});

module.exports = knex;
