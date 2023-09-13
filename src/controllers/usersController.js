const createUsers = async (req, res) => {
	return res
		.status(200)
		.json({ message: `Api running at port ${process.env.PORT}` });
};

module.exports = {
	createUsers,
};