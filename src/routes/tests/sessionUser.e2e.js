const { expect, describe, it, beforeEach, afterAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

let server;

describe("controller sessions E2E", () => {
	beforeEach(()=>{
		server = app.listen();
	});

	afterAll(()=>{
		server.close();
	});

	it("should be possible create session user", async () => {
		await request(app).post("/users").send({
			name: "test 2",
			email: "sessionTest@email.com",
			password: "12345678"
		});
		const response = await  request(app).post("/users/sessions").send({
			email: "sessionTest@email.com",
			password: "12345678"
		}); 

		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty("token");
	});

	it("should be possible error if user not found", async () => {
		const response = await request(app).post("/users/sessions").send({
			email: "notFound@email.com",
			password: "12345678"
		});
		expect(response.status).toBe(404);
		expect(response.body.errors[0].message).toBe("Usuário não encontrado");
	});

	it("should be possible error if password incorrect", async () => {
		await request(app).post("/users").send({
			name: "test 2",
			email: "incorrectPassword@email.com",
			password: "12345678",
		});
		const response = await request(app).post("/users/sessions").send({	
			email: "incorrectPassword@email.com",
			password: "123idfvhsdgbsmp9",
		});
		expect(response.status).toBe(401);
		expect(response.body.errors[0].message).toBe("Senha inválida");
	});
});