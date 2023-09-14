const knex = require("../database/knex");

const emailController = async (req, res) => {
	try {
		const emailCustomers = await knex("customers").select("email");
		const requestedEmail = req.params.email;
		const emailFound = emailCustomers.find(
			(customer) => customer.email === requestedEmail
		);

		if (emailFound) {
			return res.status(200).json(emailFound);
		}
		return res.status(400).json({ message: "E-mail não existe" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

module.exports = emailController;
