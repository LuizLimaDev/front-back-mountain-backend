const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");
const { expiresIn, secret } = require("../env/envs.js");
const { sign } = require("jsonwebtoken");

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

const sessionsUsers = async (req, res) => {
	const { email, password } = req.body;

	try {
		
		const user = await knex("users").where("email", email).first();

		if(!user){
			return res.status(204).json({message: "Usuário não encontrado"});
		}

		const passwordPassed = await compare(password, user.password);

		if(!passwordPassed){
			return res.status(203).json({message: "Senha invalida"});
		}

		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn
		});

		return res
			.status(200)
			.json({ token });
	} catch (error) {
		return res.status(500).json({message: "Internal Server Error"});
	}
};

module.exports = {
	createUsers,
	sessionsUsers,
};