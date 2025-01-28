/* eslint-disable no-undef */
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

describe("controller get charge E2E", () => {
	beforeEach(()=>{
		jest.useFakeTimers("modern").setSystemTime(new Date(2025, 1, 1, 7));
		server = app.listen();
	});

	afterAll(()=>{
		jest.useRealTimers();
		server.close();
	});


	it("should be possible to get a charge to filter by paid", async () => {
		await request(app).post("/users").send({
			name: "test",
			email: "user@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "user@email.com",
			password: "12345678",
		});
        
		const { body: customer } =await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "test@email.com",
			cpf: "745.515.123-45",
			...customerBase
		});

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2025-02-02",
			description: "Teste",
			status: "pendente"
		});
        
		const { body: { charge } } = await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing pending 2",
			value: 100,
			dueDate: "2025-02-03",
			description: "Teste",
			status: "pago"
		});

		const { body: { charges } } = await request(app).get("/charges?filter[]=pago").set("Authorization", `Bearer ${token}`);    
		expect(charge[0].customerid).toEqual(customer.id);
		expect(charge[0].value).toEqual("100.00");
		expect(charge[0].duedate).toEqual("2025-02-03T03:00:00.000Z");
		expect(charge[0].description).toEqual("Teste");
		expect(charge[0].status).toEqual("pago");
		expect(charges.length).toEqual(1);
	});

});