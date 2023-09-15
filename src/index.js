const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const { port, serverProd } = require("./env/envs");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Sem Calote",
			version: "1.0.0",
			description: "Documentação da API da Sem Calote",
			license: {
				"name": "Licença de Uso",
				"url": "https://seusite.com/license"
			},
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT"
				}
			}
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}`,
				description: "Servidor de Desenvolvimento",
			},
			{
				url: serverProd,
				description: "Servidor de produção"
			}
		],
		
	},
	apis: [
		"./src/routes/customers.routes.js", 
		"./src/routes/users.routes.js", 
		"./src/routes/charges.routes.js", 
		"./src/routes/routes.js"
	],
};
  
const swaggerSpec = swaggerJsdoc(options);
  
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, async ()=>{
	console.log(`Api running at port ${process.env.PORT}`);
});
