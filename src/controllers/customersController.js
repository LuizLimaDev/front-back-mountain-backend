require("dotenv").config();
const knex = require("../database/knex");

const listCustomers = async (req, res) => {
	try {
		await knex("charges")
			.where("duedate", "<", knex.fn.now())
			.andWhere("status", "pendente")
			.update({ status: "vencido" });
		const listPaymentsOn = await knex("customers")
			.distinct("customers.id", "customers.*", "status")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.whereNotExists(function () {
				this.select("*")
					.from("charges")
					.whereRaw("customers.id = charges.customerId")
					.whereIn("charges.status", ["pendente", "vencido"]);
			})
			.where((builder) => {
				builder.whereIn("status", ["pago"]).orWhereNull("status");
			});

		const listDefaulters = await knex("customers")
			.modify(function (queryBuilder) {
				if (process.env.NODE_ENV === "production") {
					queryBuilder.distinctOn("customers.id");
				} else {
					queryBuilder.groupBy("customers.id");
				}
			})
			.select("customers.*", "charges.status")
			.leftJoin("charges", "customers.id", "=", "charges.customerid")
			.whereIn("status", ["pendente", "vencido"]);

		return res.json({ customers: [...listPaymentsOn, ...listDefaulters] });
	} catch (error) {
		return res.status(500).json({ mensagem: error.message });
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
		await knex("charges")
			.where("duedate", "<", knex.fn.now())
			.andWhere("status", "pendente")
			.update({ status: "vencido" });
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
		return res.status(500).json({ mensagem: error.message });
	}
};

const listCustomersMetrics = async (req, res) => {
	try {
		await knex("charges")
			.where("duedate", "<", knex.fn.now())
			.andWhere("status", "pendente")
			.update({ status: "vencido" });
		const paymentsOnTotal = await knex("customers")
			.leftJoin("charges", "customers.id", "=", function () {
				this.select("id")
					.from("charges")
					.whereRaw("charges.customerid = customers.id")
					.orderBy("id", "asc")
					.limit(1);
			})
			.whereNotExists(function () {
				this.select("*")
					.from("charges")
					.whereRaw("customers.id = charges.customerId")
					.whereIn("charges.status", ["pendente", "vencido"]);
			})
			.where((builder) => {
				builder.whereIn("status", ["pago"]).orWhereNull("status");
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
			.whereNotExists(function () {
				this.select("*")
					.from("charges")
					.whereRaw("customers.id = charges.customerId")
					.whereIn("charges.status", ["pendente", "vencido"]);
			})
			.where((builder) => {
				builder.whereIn("status", ["pago"]).orWhereNull("status");
			});

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

		const listDefaulters = await knex("customers")
			.modify(function (queryBuilder) {
				if (process.env.NODE_ENV === "production") {
					queryBuilder.distinctOn("customers.id");
				} else {
					queryBuilder.groupBy("customers.id");
				}
			})
			.select("customers.*", "charges.status")
			.leftJoin("charges", "customers.id", "=", "charges.customerid")
			.whereIn("status", ["pendente", "vencido"]);

		return res.status(200).json({
			paymentsOn: {
				paymentsOnTotal,
				paymentsOnList: listPaymentsOn,
			},
			defaulters: {
				defaultersTotal,
				defaultersList: listDefaulters,
			},
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
