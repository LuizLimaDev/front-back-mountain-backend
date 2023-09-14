const { verify } = require("jsonwebtoken");
const { config } = require("dotenv");
config();

async function ensureAuthenticated(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "JWT Token nao informado" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = await verify(token, process.env.JWT_SECRET);

		req.user = {
			id: Number(user_id),
		};

		return next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: `JWT Token Invalido: ${error}` });
	}
}

module.exports = ensureAuthenticated;
