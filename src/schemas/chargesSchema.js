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
		"any.required": "O campo descrição é obrigatório",
		"string.empty": "O campo descrição é obrigatório",
		"string.min": "O campo descrição precisa ter no mínimo 3 caracteres",
	}),
	dueDate: joi.string().required().messages({
		"any.required": "O campo data é obrigatório",
		"string.empty": "O campo data é obrigatório",
	}),
	status: joi.string().valid("pago", "pendente").required().messages({
		"string.empty": "O campo status é obrigatório",
		"any.required": "O campo status é obrigatório",
		"any.valid": "O campo status precisa ser do tipo pago ou pendente",
	}),
	value: joi.number().positive().required().messages({
		"number.empty": "O campo status é obrigatório",
		"any.required": "O campo status é obrigatório",
		"any.positive": "O campo de valor precisar ser positivo",
	})
});

module.exports = { chargesSchema };
