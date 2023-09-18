const knex = require("../database/knex");

const listChargesMetrics = async (req, res) => {
	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).andWhere("status","pendente").update({status: "vencido"});

		const { paidTotalPrice } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pago")
			.sum("value as paidTotalPrice").first();
		const { paidTotalCount } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pago")
			.count("value as paidTotalCount").first();
		const paidList = await knex("customers")
			.select("charges.*")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pago");

		const { plannedTotalPrice } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pendente")
			.sum("value as plannedTotalPrice").first();
		const { plannedTotalCount } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pendente")
			.count("value as plannedTotalCount").first();
		const plannedList = await knex("customers")
			.select("charges.*")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "pendente");

		
		const { overdueTotalPrice } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "vencido")
			.sum("value as overdueTotalPrice").first();
		const { overdueTotalCount } = await knex("customers")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "vencido")
			.count("value as overdueTotalCount").first();
		const overdueList = await knex("customers")
			.select("charges.*")
			.rightJoin("charges", "customers.id", "=","charges.customerid")
			.where("status", "vencido");
		return res.status(201).json({
			paid: {
				paidTotal: paidTotalPrice,
				paidCount: Number(paidTotalCount),
				paidList,
			},
			planned: {
				plannedTotal: plannedTotalPrice,
				plannedCount: Number(plannedTotalCount),
				plannedList
			},
			overdue: {
				overdueTotal: overdueTotalPrice,
				overdueCount: Number(overdueTotalCount),
				overdueList
			}
			
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: "Server internal error"});
	}
};

const createCharges = async (req, res) => {

	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).andWhere("status","pendente").update({status: "vencido"});
		const { name, status, customerId, description, value, dueDate } = req.body;

		const charge = await knex("charges").insert({
			name,
			status,
			customerid: customerId,
			description,
			value,
			duedate: dueDate,
		}).returning("*");

		return res.status(201).json({charge});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: "Server internal error"});
	}
};

const listCharges = async (req, res) => {
	try {
		await knex("charges").where("duedate", "<", knex.fn.now()).andWhere("status","pendente").update({status: "vencido"});
		const charges = await knex("customers")
			.select("charges.*")
			.rightJoin("charges", "customers.id", "=","charges.customerid");
		
		return res.status(200).json({
			charges
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: "Server internal error"});
	}
};

module.exports = {
	listCharges,
	createCharges,
	listChargesMetrics,
};
