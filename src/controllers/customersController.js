const knex = require("../database/knex");

const listCustomers = async (req, res) => {
	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).update({status: "vencido"});
		const customers = await knex("customers")
			.distinct("customers.id", "customers.*", "status")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			});

		return res.json(customers);
	} catch (error) {
		console.log(error);
	}
};

const createCustomers = async (req, res) => {
	const {
		name,
		email,
		cpf,
		phone,
		zipcode,
		street,
		complement,
		neighborhood,
		city,
		state,
	} = req.body;

	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).update({status: "vencido"});
		const emailExists = await knex("customers").where({ email }).first();

		if (emailExists) {
			return res.status(203).json({ message: "O e-mail já existe." });
		}

		const customer = await knex("customers")
			.insert({
				name,
				email,
				cpf,
				phone,
				zipcode,
				street,
				complement,
				neighborhood,
				city,
				state,
			})
			.returning("*");

		if (!customer) {
			return res
				.status(400)
				.json("Não foi possível cadastrar o cliente.");
		}

		return res.status(201).json(customer[0]);
	} catch (error) {
		return res.status(400).json({ mensagem: error.message });
	}
};

const listCustomersMetrics = async (req, res) => {
	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).update({status: "vencido"});
		const paymentsOnTotal = await knex("customers")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.where((builder) => {
				builder.whereIn("status", ["pago"]).orWhereNull("status");
			})
			.countDistinct("customers.id as total")
			.first();

		const defaultersTotal = await knex("customers")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.where((builder) => {
				builder.whereIn("status", ["pendente", "vencido"]);
			})
			.countDistinct("customers.id as total")
			.first();

		const listPaymentsOn = await knex("customers")
			.distinct("customers.id", "customers.*", "status")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.where((builder) => {
				builder.whereIn("status", ["pago"]).orWhereNull("status");
			});

		const listDefaulters = await knex("customers")
			.distinct("customers.id", "customers.*", "status")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.where((builder) => {
				builder.whereIn("status", ["pendente", "vencido"]);
			});

		return res.status(200).json({
			paymentsOn: {
				paymentsOnTotal,
				paymentsOnList: listPaymentsOn
			},
			defaulters: {
				defaultersTotal,
				defaultersList: listDefaulters
			}
		});
	} catch (error) {
		return res.status(400).json({ mensagem: error.message });
	}
};

module.exports = {
	listCustomers,
	createCustomers,
	listCustomersMetrics,
};
