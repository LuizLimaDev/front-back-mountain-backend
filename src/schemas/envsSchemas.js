const joi = require("joi");

const envsSchemas = joi.object({
	port: joi.number(),
	secret: joi.string().required().messages({
		"any.required": "A variável de ambiente JWT_SECRET é obrigatória.",
		"string.empty": "A variável de ambiente JWT_SECRET é obrigatória.",
	}),
	expiresIn: joi.string().required().messages({
		"any.required": "A variável de ambiente EXPIRES_IN é obrigatória.",
		"string.empty": "A variável de ambiente EXPIRES_IN é obrigatória.",
	}),
});

module.exports = {
	envsSchemas,
};
