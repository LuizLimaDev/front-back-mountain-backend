/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("charges", function (table) {
		table.increments("id").primary();
		table.string("name").notNullable();
		table
			.integer("customerid") 
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("customers")
			.onDelete("CASCADE") 
			.onUpdate("CASCADE");
		table.text("description").notNullable();
		table.decimal("value", 10, 2).notNullable();
		table.date("duedate").notNullable();
		table.string("status").defaultTo("pendente");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable("charges");
};
