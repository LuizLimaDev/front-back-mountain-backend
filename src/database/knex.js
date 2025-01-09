const  { config } = require("dotenv");
const { knex } = require("knex");
const knexfile = require("../../knexfile");
config();

const environment =  process.env.NODE_ENV || "development";
const ConfigDb = knexfile[environment];

module.exports = knex(ConfigDb);