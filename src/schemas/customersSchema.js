const joi = require("joi");

const customersSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres",
	}),

	email: joi
		.string()
		.email({ tlds: { allow: ["com"] } })
		.required()
		.messages({
			"string.email": "O campo email precisa ter um formato válido",
			"any.required": "O campo email é obrigatório",
			"string.empty": "O campo email é obrigatório",
		}),

	cpf: joi
		.string()
		.required()
		.pattern(/^\d{3}.\d{3}.\d{3}-\d{2}$/)
		.message("O CPF deve estar no formato XXX.XXX.XXX-XX"),

	phone: joi.string().required().messages({
		"any.required": "O campo telefone é obrigatório",
		"string.empty": "O campo telefone é obrigatório",
	}),

	zipcode: joi.string().min(8).max(8),

	street: joi.string(),

	complement: joi.string(),

	neighborhood: joi.string(),

	city: joi.string(),

	state: joi.string(),
});

module.exports = customersSchema;
