const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

async function ensureAuthenticated(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "JWT Token não informado" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		req.customer = {
			id: Number(decodedToken.sub),
		};

		return next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: `JWT Token Inválido: ${error.message}` });
	}
}

module.exports = ensureAuthenticated;
