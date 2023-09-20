const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");
const { expiresIn, secret } = require("../env/envs.js");
const { sign } = require("jsonwebtoken");

const createUsers = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await knex("users").where("email", email).first();

		if (user) {
			return res
				.status(203)
				.json({ message: "Ja existe um usuário com esse email" });
		}

		const passwordHashed = await hash(password, 10);

		await knex("users").insert({
			name,
			email,
			password: passwordHashed,
		});

		return res.status(200).json({ message: "Usuário criado com sucesso" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const sessionsUsers = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await knex("users").where("email", email).first();

		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		const passwordPassed = await compare(password, user.password);

		if (!passwordPassed) {
			return res.status(403).json({ message: "Senha inválida" });
		}

		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn,
		});

		return res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const profileUsers = async (req, res) => {
	const { id } = req.user;

	try {
		const user = await knex("users")
			.select("name", "email")
			.where("id", id)
			.first();

		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		return res.status(200).json({ ...user });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const editUsers = async (req, res) => {
	try {
		const { id } = req.user;
		const { name, email, newPassword, phone, cpf } = req.body;

		let user = await knex("users").where("id", id).first();

		if (!user) {
			return res.status(204).json({ message: "Usuário não encontrado" });
		}

		const emailAlreadyExists = await knex("users")
			.where("email", email)
			.first();

		if (emailAlreadyExists && emailAlreadyExists.id !== user.id) {
			res.status(400).json({
				message:
					"Nao pode mudar email, uma conta com esse email ja existe",
			});
		}

		const cpfAlreadyExists = await knex("users").where("cpf", cpf).first();

		if (cpfAlreadyExists && cpfAlreadyExists.id !== user.id) {
			res.status(400).json({
				message: "Nao pode mudar cpf, uma conta com esse cpf ja existe",
			});
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;
		user.phone = phone ?? user.phone;
		user.cpf = cpf ?? user.cpf;

		if (newPassword) {
			user.password = await hash(newPassword, 8);
		}

		await knex("users")
			.update({
				name: user.name,
				email: user.email,
				phone: user.phone,
				cpf: user.cpf,
				password: user.password,
			})
			.where("id", id);

		return res.status(204).json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	createUsers,
	sessionsUsers,
	profileUsers,
	editUsers,
};
