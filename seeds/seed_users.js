const { hash } = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	const passwordHashed = await hash("12345678", 10);
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("users").insert([
		{
			name: "User 1", 
			email: "user1@email.com", 
			password: passwordHashed
		},
		{
			name: "User 2", 
			email: "user2@email.com", 
			password: passwordHashed
		},
		{
			name: "User 3", 
			email: "user3@email.com",
			password: passwordHashed
		}
	]);
};
