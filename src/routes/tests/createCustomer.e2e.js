const { expect, describe, it, beforeEach, afterAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

let server;

describe("controller create customer E2E", () => {
	beforeEach(()=>{
		server = app.listen();
	});

	afterAll(()=>{
		server.close();
	});


	it("should be possible to create a customer", async () => {
		await request(app).post("/users").send({
			name: "test",
			email: "test@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "test@email.com",
			password: "12345678"
		});
		const response = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			name: "test",
			email: "test@email.com",
			cpf: "745.515.123-45",
			phone: "(11) 55555-4444",
			zipcode: "12345678",
			street: "test",
			complement: "test",
			neighborhood: "test",
			city: "São paulo",
			state: "São paulo"
		});
		expect(response.status).toBe(201);
		expect(response.body.name).toEqual("test");
		expect(response.body.email).toEqual("test@email.com");
		expect(response.body.cpf).toEqual("745.515.123-45");
		expect(response.body.phone).toEqual("(11) 55555-4444");
		expect(response.body.zipcode).toEqual("12345678");
		expect(response.body.street).toEqual("test");
		expect(response.body.complement).toEqual("test");
		expect(response.body.neighborhood).toEqual("test");
		expect(response.body.city).toEqual("São paulo");
		expect(response.body.state).toEqual("São paulo");
	});

	it("should be possible error if email already exist", async () => {
		await request(app).post("/users").send({
			name: "test",
			email: "testEmailAlready@email.com",
			password: "12345678"
		});
        
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "testEmailAlready@email.com",
			password: "12345678"
		});

		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			name: "test",
			email: "repeat@email.com",
			cpf: "745.515.123-49",
			phone: "(11) 55555-4444",
			zipcode: "12345678",
			street: "test",
			complement: "test",
			neighborhood: "test",
			city: "São paulo",
			state: "São paulo"
		});
        
		const response = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			name: "test",
			email: "repeat@email.com",
			cpf: "745.515.123-70",
			phone: "(11) 55555-3334",
			zipcode: "12345678",
			street: "test",
			complement: "test",
			neighborhood: "test",
			city: "São paulo",
			state: "São paulo"
		});

		expect(response.status).toEqual(401);
		expect(response.body.errors[0].message).toEqual("O e-mail já existe.");
        
	});

	it("should be possible error if cpf already exist", async () => {
		await request(app).post("/users").send({
			name: "test",
			email: "testCpfAlready@email.com",
			password: "12345678"
		});

		const { body: { token } } = await request(app).post("/users/sessions").send({   
			email: "testCpfAlready@email.com",
			password: "12345678"
		});

		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			name: "test",
			email: "repeatCpf@email.com",
			cpf: "745.515.123-88",
			phone: "(11) 55555-4444",
			zipcode: "12345678",
			street: "test",
			complement: "test",
			neighborhood: "test",
			city: "São paulo",
			state: "São paulo"
		});     

		const response = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			name: "test",
			email: "repeatCpf2@email.com",
			cpf: "745.515.123-88",
			phone: "(11) 55555-3334",
			zipcode: "12345678",
			street: "test",
		});

		expect(response.status).toEqual(401);
		expect(response.body.errors[0].message).toEqual("O cpf já existe.");
	});
});