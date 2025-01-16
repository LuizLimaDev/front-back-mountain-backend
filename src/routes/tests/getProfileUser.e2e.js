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
	
	it("should be possible error if email already exist", async () => {
		await request(app).post("/users").send({
			name: "test 2",
			email: "emailReadyEdit@email.com",
			password: "12345678"
		});
		
		await request(app).post("/users").send({
			name: "test 2",
			email: "tryEditEmail@email.com",
			password: "12345678"
		});
		
		const { body } = await  request(app).post("/users/sessions").send({
			email: "tryEditEmail@email.com",
			password: "12345678"
		});

		const response = await request(app).put("/users").set("Authorization", `Bearer ${body.token}`).send({
			name: "new Test",
			email: "emailReadyEdit@email.com",
		});

		expect(response.status).toEqual(403);
		expect(response.body.errors[0].message).toEqual("Uma conta com esse email ja existe");	
	});

	it("should be possible error if cpf already exist", async () => {
		await request(app).post("/users").send({
			name: "test 2",
			email: "cpfReadyEdit@email.com",
			password: "12345678"
		});
		
		await request(app).post("/users").send({
			name: "test 2",
			email: "tryEditCpf@email.com",
			password: "12345678"
		});
		
		const { body } = await  request(app).post("/users/sessions").send({
			email: "tryEditCpf@email.com",
			password: "12345678"
		});

		const { body: bodyAlready } = await  request(app).post("/users/sessions").send({
			email: "cpfReadyEdit@email.com",
			password: "12345678"
		});

		await request(app).put("/users").set("Authorization", `Bearer ${bodyAlready.token}`).send({
			name: "new Test",
			email: "cpfReadyEditNew@email.com",
			cpf: "123.456.789-85"
		});

		const response = await request(app).put("/users").set("Authorization", `Bearer ${body.token}`).send({
			name: "new Test",
			email: "tryEditCpfNew@email.com",
			cpf: "123.456.789-85",
		});

		expect(response.status).toEqual(403);
		expect(response.body.errors[0].message).toEqual("CPF já existente!");	
	});
});