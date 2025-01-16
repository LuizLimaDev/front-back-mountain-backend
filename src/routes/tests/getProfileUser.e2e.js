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
		expect(response.body).toHaveProperty("email");
		expect(	response.body.email).toEqual("getProfile@email.com");
		expect(response.body).toHaveProperty("name");
		expect(response.body.name).toEqual("test 2");
		expect(response.body).toHaveProperty("cpf");
		expect(response.body).toHaveProperty("phone");
	});

	it("should be possible edit profile", async ()=>{
		await request(app).post("/users").send({
			name: "test Edit",
			email: "editProfile@email.com",
			password: "12345678"
		});

		const { body } = await  request(app).post("/users/sessions").send({
			email: "editProfile@email.com",
			password: "12345678"
		}); 

		const response = await request(app).put("/users").set("Authorization", `Bearer ${body.token}`).send({
			name: "new Test",
			email: "editNewEmail@email.com",
			newPassword: "123456789",
			phone: "(11) 11234-5678",
			cpf: "123.456.789-80"
		});

		expect(response.status).toEqual(204);
	});
	
});