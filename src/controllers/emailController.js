const knex = require("../database/knex");

const emailController = async (req, res) => {
	try {
		const requestedEmail = req.params.email;
		const emailUsers = await knex("users")
			.where("email", requestedEmail)
			.first();

		if (emailUsers) {
			return res.status(401).json({ message: "O e-mail já existe" });
		}

		return res
			.status(200)
			.json({ message: "E-mail disponível para ser usado" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

module.exports = emailController;
