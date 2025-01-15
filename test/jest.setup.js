require("dotenv").config();
const { beforeAll, afterAll } = require("@jest/globals");
const { randomUUID } = require("crypto");
const knex = require("../src/database/knex");

const schema = `schema-${randomUUID()}`;

function generateDatabaseUrl(schema) {
	if (!process.env.DATABASE_URL) throw new Error("Please environment DATABASE_URL");
  
	const dabatabaseUrl = new URL(process.env.DATABASE_URL);
	dabatabaseUrl.searchParams.set("schema", schema);
	process.env.DATABASE_URL = dabatabaseUrl.toString();
}

jest.setTimeout(20000);


beforeAll(async () => {
	generateDatabaseUrl(schema);
	await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
	await knex.raw(`SET search_path TO "${schema}"`);
	await knex.migrate.latest();
});

afterAll(async () => {
	await knex.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
});
