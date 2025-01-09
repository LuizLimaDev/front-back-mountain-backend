/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("customers", (table) => {
		table.increments("id").primary(); 
		table.string("name").notNullable();
		table.string("email").notNullable().unique();
		table.string("cpf").notNullable().unique();
		table.string("zipcode").notNullable();
		table.string("street").notNullable();
		table.string("complement");
		table.string("neighborhood").notNullable(); 
		table.string("city").notNullable();
		table.string("state").notNullable();
		table.string("phone").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable("customers");
};
