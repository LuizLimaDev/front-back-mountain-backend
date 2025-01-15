require("dotenv").config();
const { execSync } = require("child_process");
const { beforeAll, afterAll } = require("@jest/globals");

jest.setTimeout(20000);

beforeAll(async () => {
	const command = "npx knex migrate:latest -- --env test";
	execSync(command, {
		env: process.env,
	});
});

afterAll(async () => {
	const command = "npx knex migrate:rollback -- --env test";
	execSync(command, {
		env: process.env,
	});
});
