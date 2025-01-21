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

describe("controller create charge E2E", () => {
	beforeEach(()=>{
		jest.useFakeTimers("modern").setSystemTime(new Date(2025, 1, 1, 7));
		server = app.listen();
	});

	afterAll(()=>{
		jest.useRealTimers();
		server.close();
	});


	it("should be possible to create a charge", async () => {
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

		const { body: { charge }, status } = await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2025-02-02",
			description: "Teste",
			status: "pendente"
		});        

		expect(status).toEqual(201);
		expect(charge[0].customerid).toEqual(customer.id);
		expect(charge[0].value).toEqual("100.00");
		expect(charge[0].duedate).toEqual("2025-02-02T03:00:00.000Z");
		expect(charge[0].description).toEqual("Teste");
		expect(charge[0].status).toEqual("pendente");

	});

	it("should be possible to edit charge", async ()=> {
		await request(app).post("/users").send({
			name: "test",
			email: "userEdit@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "userEdit@email.com",
			password: "12345678",
		});
        
		const { body: customer } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "testEdit@email.com",
			cpf: "745.515.123-80",
			...customerBase
		});

		const { body: { charge } } = await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({	
			customerId: customer.id,	
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2025-02-02",
			description: "Teste",
			status: "pendente"	
		});
		const [{ id }] = charge;

		const newCharge = {
			description: "Edit charge to paid", 
			status: "pago", 
			value: 200, 
			dueDate: "2025-02-03"
		};
		const { body, status } = await request(app).put(`/charges/${id}`).set("Authorization", `Bearer ${token}`).send({
			...newCharge
		});

		expect(status).toEqual(200);
		expect(body.message).toEqual("Cobrança editada com sucesso!");
	});

	it("should be possible to delete charge", async () => {
		await request(app).post("/users").send({
			name: "test",
			email: "userDelete@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "userDelete@email.com",
			password: "12345678",
		});
        
		const { body: customer } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "testDelete@email.com",
			cpf: "745.515.123-90",
			...customerBase
		});

		const { body: { charge } } = await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({	
			customerId: customer.id,	
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2026-02-02",
			description: "Teste",
			status: "pendente"	
		});


		const { status } = await request(app).delete(`/charges/${charge[0].id}`).set("Authorization", `Bearer ${token}`).send();	
		expect(status).toEqual(204);
		
	});

});