const { expect, describe, it, beforeEach, afterAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

let server;
const customerBase = {
	name: "test",
	phone: "(11) 55555-4444",
	zipcode: "12345678",
	street: "test",
	complement: "test",
	neighborhood: "test",
	city: "São paulo",
	state: "São paulo"
};

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
			email: "user@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "user@email.com",
			password: "12345678",
		});
        
		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "test@email.com",
			cpf: "745.515.123-45",
			...customerBase
		});
		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "test2@email.com",
			cpf: "745.515.123-46",
			...customerBase
		});
		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "test3@email.com",
			cpf: "745.515.123-47",
			...customerBase
		
		});
		await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "test4@email.com",
			cpf: "745.515.123-48",
			...customerBase
		});

        
		const response = await request(app).get("/customers").set("Authorization", `Bearer ${token}`);
		expect(response.status).toEqual(200);   
		expect(response.body.customers.length).toEqual(4);

	});


});