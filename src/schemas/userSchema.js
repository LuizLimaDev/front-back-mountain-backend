const joi = require("joi");

const email = joi
	.string()
	.email({ tlds: { allow: ["com"] } })
	.required()
	.messages({
		"string.email": "O campo email precisa ter um formato válido",
		"any.required": "O campo email é obrigatório",
		"string.empty": "O campo email é obrigatório",
	});

const validateEmail = joi.object({ email });

const userSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres.",
	}),

	email,

	password: joi.string().min(8).max(32).required().messages({
		"any.required": "O campo senha é obrigatório",
		"string.empty": "O campo senha é obrigatório",
		"string.min": "A senha precisa conter, no mínimo, 5 caracteres",
		"string.max": "A senha precisa conter, no máximo, 32 caracteres",
	}),
	cpf: joi
		.string()
		.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.message("O CPF deve estar no formato XXX.XXX.XXX-XX"),
	phone: joi
		.string()
		.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
		.message(
			"O número de telefone com DDD deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
		),
});

const sessionsUserSchema = joi.object({
	email,

	password: joi.string().min(8).max(32).required().messages({
		"any.required": "O campo senha é obrigatório",
		"string.empty": "O campo senha é obrigatório",
		"string.min": "A senha precisa conter, no mínimo, 5 caracteres",
		"string.max": "A senha precisa conter, no máximo, 32 caracteres",
	}),
});

const editUsersSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres.",
	}),
	email,

	newPassword: joi.string().min(8).max(32).messages({
		"string.min": "A senha precisa conter, no mínimo, 5 caracteres",
		"string.max": "A senha precisa conter, no máximo, 32 caracteres",
	}),
	cpf: joi
		.string()
		.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
		.message("O CPF deve estar no formato XXX.XXX.XXX-XX"),
	phone: joi
		.string()
		.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
		.message(
			"O número de telefone com DDD deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
		),
});

module.exports = {
	userSchema,
	sessionsUserSchema,
	editUsersSchema,
	validateEmail,
};
