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
		.messages({
			"string.pattern.base": "Formato correto: XXX.XXX.XXX-XX",
			"any.required": "O campo cpf é obrigatório",
			"string.empty": "O campo cpf é obrigatório",
		}),

	phone: joi.string().required().messages({
		"any.required": "O campo telefone é obrigatório",
		"string.empty": "O campo telefone é obrigatório",
	}),

	zipcode: joi.string().min(8).max(8).allow(null, "").messages({
		"string.min": "O tamanho do CEP deve ser de 8 caracteres.",
		"string.max": "O tamanho do CEP deve ser de 8 caracteres.",
	}),

	street: joi.string().allow(null, ""),

	complement: joi.string().allow(null, ""),

	neighborhood: joi.string().allow(null, ""),

	city: joi.string().allow(null, ""),

	state: joi.string().allow(null, ""),
});

module.exports = customersSchema;
