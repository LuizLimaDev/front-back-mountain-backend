const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const { port } = require("./env/envs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, async () => {
	console.log(`Api running at port ${process.env.PORT}`);
});
