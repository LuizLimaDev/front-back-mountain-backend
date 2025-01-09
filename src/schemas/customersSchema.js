const joi = require("joi");

const customersSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "Este campo deve ser preenchido",
		"string.empty": "Este campo deve ser preenchido",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres",
	}),

	email: joi
		.string()
		.email({ tlds: { allow: ["com"] } })
		.required()
		.messages({
			"string.email": "O campo email precisa ter um formato válido",
			"any.required": "Este campo deve ser preenchido",
			"string.empty": "Este campo deve ser preenchido",
		}),

	cpf: joi
		.string()
		.required()
		.pattern(/^\d{3}.\d{3}.\d{3}-\d{2}$/)
		.messages({
			"string.pattern.base": "Formato: XXX.XXX.XXX-XX",
			"any.required": "Este campo deve ser preenchido",
			"string.empty": "Este campo deve ser preenchido",
		}),

	phone: joi.string().required().messages({
		"any.required": "Este campo deve ser preenchido",
		"string.empty": "Este campo deve ser preenchido",
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
