const joi = require("joi");

const customerSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres",
	}),

	email: joi
		.string()
		.email({ inDomainSegments: 2, tlds: { allow: ["com"] } })
		.required()
		.messages({
			"string.email": "O campo email precisa ter um formato válido",
			"any.required": "O campo email é obrigatório",
			"string.empty": "O campo email é obrigatório",
		}),

	cpf: joi
		.string()
		.min(11)
		.max(11)
		.pattern(/^\d{3}.\d{3}.\d{3}-\d{2}$/)
		.message("O CPF deve estar no formato XXX.XXX.XXX-XX"),

	phone: joi
		.string()
		.pattern(/^(\d{2}) \d{4,5}-\d{4}$/)
		.message(
			"O número de telefone com DDD deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
		),

	cep: joi.string().min(8).max(8),

	address: joi.string(),

	addressNumber: joi.string(),

	neighborhood: joi.string(),

	city: joi.string(),

	state: joi.string(),
});

module.exports = customerSchema;
