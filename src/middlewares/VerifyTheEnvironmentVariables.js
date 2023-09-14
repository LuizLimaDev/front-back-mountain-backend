require("dotenv").config();

const verifyTheEnvironmentVariables = (joiSchema) => async (req, res, next) => {
	try {
		await joiSchema.validateAsync({
			port: process.env.PORT ?? 3000,
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.EXPIRES_IN,
		});
		next();
	} catch (error) {
		return res.status(400).json({ mensagem: error.message });
	}
};

module.exports = {
	verifyTheEnvironmentVariables,
};
