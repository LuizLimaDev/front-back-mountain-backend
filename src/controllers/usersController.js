const { hash } = require("bcrypt");
const knex = require("../database/knex");

const createUsers = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		
		const user = await knex("users").where("email", email).first();

		if(user){
			return res.status(203).json({message: "Ja existe um usuário com esse email"});
		}

		const passwordHashed = await hash(password, 10);

		await knex("users").insert({
			username,
			email,
			password: passwordHashed,
		});

		return res
			.status(200)
			.json({ message: "Usuário criado com sucesso" });
	} catch (error) {
		return res.status(500).json({message: "Internal Server Error"});
	}

};

module.exports = {
	createUsers,
};