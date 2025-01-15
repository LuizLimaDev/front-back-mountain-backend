const { expect, describe, it, beforeEach, afterAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

let server;

describe("controller user profile E2E", () => {
	beforeEach(()=>{
		server = app.listen();
	});

	afterAll(()=>{
		server.close();
	});

	it("should be possible get profile", async () => {
		await request(app).post("/users").send({
			name: "test 2",
			email: "getProfile@email.com",
			password: "12345678"
		});
		const { body } = await  request(app).post("/users/sessions").send({
			email: "getProfile@email.com",
			password: "12345678"
		}); 
		const response = await request(app).get("/users/profile").set("Authorization", `Bearer ${body.token}`);

		expect(response.status).toEqual(200);
	});
});