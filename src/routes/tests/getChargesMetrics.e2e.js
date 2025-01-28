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


	it("should be to possible to get a charge to metrics", async ()=> {
		await request(app).post("/users").send({
			name: "test",
			email: "userMetrics@email.com",
			password: "12345678"
		}); 
		const { body: { token } } = await request(app).post("/users/sessions").send({
			email: "userMetrics@email.com",
			password: "12345678",
		});
        
		const { body: customer } = await request(app).post("/customers").set("Authorization", `Bearer ${token}`).send({
			email: "testMetrics@email.com",
			cpf: "745.515.123-45",
			...customerBase
		});
		
		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing pending",
			value: 100,
			dueDate: "2025-05-02",
			description: "Teste",
			status: "pendente"
		});

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing pending 2",
			value: 100,
			dueDate: "2025-05-02",
			description: "Teste",
			status: "pendente"
		});
        
		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing paid",
			value: 50,
			dueDate: "2025-02-02",
			description: "Teste",
			status: "pago"
		});	

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing paid 2",
			value: 50,
			dueDate: "2025-02-02",
			description: "Teste",
			status: "pago"
		});

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing expired",
			value: 30,
			dueDate: "2024-01-02",
			description: "Teste",
			status: "pendente"
		});

		await request(app).post("/charges").set("Authorization", `Bearer ${token}`).send({
			customerId: customer.id,
			name: "Charge Testing expired 2",
			value: 30,
			dueDate: "2024-01-02",
			description: "Teste",
			status: "pendente"
		});
		const { body } = await request(app).get("/charges/metrics").set("Authorization", `Bearer ${token}`);
		expect(body.paid.paidTotal).toEqual("100.00");
		expect(body.paid.paidCount).toEqual(2);
		expect(body.paid.paidList.length).toEqual(2);
		expect(body.planned.plannedTotal).toEqual("200.00");
		expect(body.planned.plannedCount).toEqual(2);
		expect(body.planned.plannedList.length).toEqual(2);
		expect(body.overdue.overdueTotal).toEqual("60.00");
		expect(body.overdue.overdueCount).toEqual(2);
		expect(body.overdue.overdueList.length).toEqual(2);
	});

});