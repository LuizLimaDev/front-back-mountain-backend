const { expect, describe, it, beforeEach, afterAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

let server;
let userData = {
	name: "test",
	email: "test@email.com",
	password: "12345678"
};

describe("controller users E2E", () => {
	beforeEach(()=>{
		server = app.listen();
	});

	afterAll(()=>{
		server.close();
	});


	it("should be possible to create a user", async () => {
		const response = await request(app).post("/users").send(userData); 
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Usuário criado com sucesso");
	});

	it("should return an error if a user with the same email already exists", async () => {
		await request(app).post("/users").send(userData); 
		const response = await request(app).post("/users").send({
			name: "test 2",
			email: "test@email.com",
			password: "12345678"
		});
		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Usuário criado com sucesso");
	});
});