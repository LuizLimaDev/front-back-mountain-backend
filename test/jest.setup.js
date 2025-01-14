require("dotenv").config();
const { execSync } = require("child_process");
const { randomUUID } = require("crypto");
const knex = require("../src/database/knex");
const { beforeAll, afterAll } = require("@jest/globals");

function generateDatabaseUrl(schema) {
	if (!process.env.DATABASE_URL)
		throw new Error("Please environment DATABASE_URL");

	const dabatabaseUrl = new URL(process.env.DATABASE_URL);
	dabatabaseUrl.searchParams.set("schema", schema);
	process.env.DATABASE_URL = dabatabaseUrl.toString();
}

jest.setTimeout(20000);

const schema = randomUUID();

beforeAll(async () => {
	generateDatabaseUrl(schema);
	await knex.schema.createSchema(`${schema}`);
	const command = "npx knex migrate:latest -- --env test";
	execSync(command, {
		env: process.env,
	});
});

afterAll(async () => {
	await knex.schema.dropSchemaIfExists(schema, true);
	await knex.destroy();
});
