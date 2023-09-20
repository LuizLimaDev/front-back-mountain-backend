const validateRequestBody = (joiSchema) => async (req, res, next) => {
	try {
		await joiSchema.validateAsync(req.body,  { abortEarly: false });
		next();
	} catch (error) {
		const errors = error.details.map(error => {
			return {
				message: error.message,
				type: error.context.label,
			};
		});
		return res.status(400).json({ errors });
	}
};

module.exports = {
	validateRequestBody,
};
