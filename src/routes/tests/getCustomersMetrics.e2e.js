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

describe("controller get customers E2E", () => {
	beforeEach(()=>{
		jest.useFakeTimers("modern").setSystemTime(new Date(2025, 1, 1, 7));
		server = app.listen();
	});

	afterAll(()=>{
		jest.useRealTimers();
		server.close();
	});


	it("should be to possible to get a customers to metrics", async ()=> {
		await request(app).post("/users").send({
			name: "test",
			email: "userMetrics@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "userMetrics@email.com",
			password: "12345678",
		});
        
		const { body: customerPaid } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "metricPaid@email.com",
			cpf: "745.515.123-45",
			...customerBase
		});
		
		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customerPaid.id,
			name: "Charge Testing paid",
			value: 100,
			dueDate: "2025-05-02",
			description: "Teste",
			status: "pago"
		});

		const { body: customerPending } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "metricPending@email.com",
			cpf: "745.515.124-45",
			...customerBase
		});
        
		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customerPending.id,
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2025-05-02",
			description: "Teste",
			status: "pendente"
		});

		const { body: customerOverdue } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "metricOverdue@email.com",
			cpf: "745.515.125-45",
			...customerBase
		});

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customerOverdue.id,
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2024-05-02",
			description: "Teste",
			status: "pendente"
		});

		const { body } = await request(app).get("/customers/metrics").set("Authorization", `Bearer ${token}`);
        
		expect(body.paymentsOn.paymentsOnTotal.total).toEqual("1");
		expect(body.paymentsOn.paymentsOnList.length).toEqual(1);
		expect(body.defaulters.defaultersTotal.total).toEqual("2");
		expect(body.defaulters.defaultersList.length).toEqual(2);
	});

});