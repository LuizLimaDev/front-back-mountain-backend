const joi = require("joi");

const chargesSchema = joi.object({
	name: joi.string().min(3).required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório",
		"string.min": "O campo nome precisa ter no mínimo 3 caracteres",
	}),
	customerId: joi.number().required().messages({
		"number.empty": "O campo customerid é obrigatório",
		"any.required": "O campo customerid é obrigatório",
	}),
	description: joi.string().min(3).required().messages({
		"any.required": "Este campo deve ser preenchido",
		"string.empty": "Este campo deve ser preenchido",
		"string.min": "O campo descrição precisa ter no mínimo 3 caracteres",
	}),
	dueDate: joi.string().required().messages({
		"any.required": "Este campo deve ser preenchido",
		"string.empty": "Este campo deve ser preenchido",
	}),
	status: joi.string().valid("pago", "pendente").required().messages({
		"string.empty": "Este campo deve ser preenchido",
		"any.required": "Este campo deve ser preenchido",
		"any.only": "O campo status precisa ser do tipo pago ou pendente",
	}),
	value: joi.number().positive().required().messages({
		"number.empty": "Este campo deve ser preenchido",
		"any.required": "Este campo deve ser preenchido",
		"number.positive": "O campo de valor precisar ser positivo",
	}),
});

module.exports = { chargesSchema };
