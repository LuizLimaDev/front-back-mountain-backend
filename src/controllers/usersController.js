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
				.status(403)
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
		let errors = [];
		const user = await knex("users").where("email", email).first();

		if (!user) {
			errors.push({
				type: "email",
				message: "Usuário não encontrado"
			});
			return res.status(404).json({
				errors
			});
		}

		const passwordPassed = await compare(password, user.password);

		if (!passwordPassed) {
			errors.push({
				type: "password",
				message: "Senha inválida"
			});
		}

		if (errors.length > 0) {
			return res.status(401).json({ errors });
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
			.select("name", "email", "cpf", "phone")
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

		let errors = [];

		let user = await knex("users").where("id", id).first();

		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		const emailAlreadyExists = await knex("users")
			.where("email", email)
			.first();

		if (email && emailAlreadyExists && emailAlreadyExists.id !== user.id) {
			errors.push({
				type: "email",
				message: "Uma conta com esse email ja existe"
			});
		}

		let cpfAlreadyExists = null;
		if(cpf) {
			cpfAlreadyExists = await knex("users").where("cpf", cpf).first();
		}

		if (cpf && cpfAlreadyExists && cpfAlreadyExists.id !== user.id) {
			errors.push({
				type: "cpf",
				message: "CPF já existente!"
			});
		}

		if (errors.length > 0) {
			return res.status(403).json({ errors });
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

		return res.status(204).json({ message: "ok"});
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
