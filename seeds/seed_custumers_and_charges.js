/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	// Deletes ALL existing entries
	await knex("charges").del();
	await knex("customers").del();
	await knex("customers").insert([
		{
			id: 1, 
			name: "Customer 1", 
			email: "customer1@email.com", 
			cpf: "745.515.123-45", 
			zipcode: "12345-123",
			phone: "(11) 55555-4444", 
			street: "Rua 1",
			complement: "Casa 1",
			neighborhood: "Bairro 1",
			city: "Cidade 1",
			state: "Estado 1"
		},
		{
			id: 2, 
			name: "Customer 2", 
			email: "customer2@email.com", 
			cpf: "745.515.124-45", 
			zipcode: "12345-123",
			phone: "(11) 55555-4444", 
			street: "Rua 2",
			complement: "Casa 2",
			neighborhood: "Bairro 2",
			city: "Cidade 2",
			state: "Estado 2"
		},
		{
			id: 3, 
			name: "Customer 3", 
			email: "customer3@email.com", 
			cpf: "745.515.125-45", 
			zipcode: "12345-123",
			phone: "(11) 55555-4444", 
			street: "Rua 3",
			complement: "Casa 3",
			neighborhood: "Bairro 3",
			city: "Cidade 3",
			state: "Estado 3"
		}
	]);
	await knex("charges").insert([
		{
			id: 1, 
			name: "Charge 1", 
			status: "pendente", 
			customerid: 1, 
			description: "Description 1", 
			value: 100.00, 
			dueDate: "2028-01-01"
		},
		{
			id: 2,
			name: "Charge 2",
			status: "pendente",
			customerid: 1,
			description: "Description 2",
			value: 200.00,
			dueDate: "2028-01-02"
		},
		{
			id: 3,
			name: "Charge 3",
			status: "pendente",
			customerid: 1,
			description: "Description 3",
			value: 300.00,
			dueDate: "2028-01-03"
		},
		{
			id: 4,
			name: "Charge 4",
			status: "pago",
			customerid: 2,
			description: "Description 4",
			value: 400.00,
			dueDate: "2025-01-04"
		},
		{
			id: 5,
			name: "Charge 5",
			status: "pago",
			customerid: 2,
			description: "Description 5",
			value: 500.00,
			dueDate: "2025-01-05"
		},
		{
			id: 6,
			name: "Charge 6",
			status: "pago",
			customerid: 2,    
			description: "Description 6",
			value: 600.00,  
			dueDate: "2025-01-06"
		},
		{
			id: 7,
			name: "Charge 7",
			status: "pendente",
			customerid: 3,
			description: "Description 7",
			value: 700.00,
			dueDate: "2022-01-07"
		},
		{
			id: 8,
			name: "Charge 8",
			status: "pendente",
			customerid: 3,
			description: "Description 8",
			value: 800.00,
			dueDate: "2022-01-08"
		},
		{
			id: 9,
			name: "Charge 9",
			status: "pendente",
			customerid: 3,
			description: "Description 9",
			value: 900.00,
			dueDate: "2022-01-09"
		}
    
	]);
};
