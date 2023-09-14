require("dotenv").config();

const envs = {
	port: process.env.PORT ?? 3000,
	secret: process.env.JWT_SECRET,
	expiresIn: process.env.EXPIRES_IN,
};

module.exports = envs;
