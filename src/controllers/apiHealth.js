const apiHealth = async (req, res) => {
	return res.status(200).json({ message: "Bem-vindo(a) a API Sem Calote" });
};

module.exports = apiHealth;
