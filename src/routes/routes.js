const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customersRoutes = require("./customers.routes");
const emailController = require("../controllers/emailController");
const {
	verifyTheEnvironmentVariables,
} = require("../middlewares/VerifyTheEnvironmentVariables");

routes.get("/", verifyTheEnvironmentVariables);
const { usersRoutes } = require("./users.routes");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const {
	validateRequestParams,
} = require("../middlewares/validateRequestParams");
const { validateEmail } = require("../schemas/userSchema");
const chargesRoutes = require("./charges.routes");

routes.get("/", apiHealth);
routes.use("/customers", ensureAuthenticated, customersRoutes);

routes.get(
	"/email/:email",
	validateRequestParams(validateEmail),
	emailController
);

/**
 * @swagger
 * /email/{email}:
 *   get:
 *     summary: Verifica a disponibilidade de um endereço de e-mail.
 *     tags:
 *       - email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Endereço de e-mail a ser verificado.
 *         schema:
 *           type: string
 *         example: test@example.com
 *     responses:
 *       200:
 *         description: E-mail disponível para ser usado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail disponível para ser usado
 *       400:
 *         description: Erros de validação no formato do e-mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: O campo email precisa ter um formato válido
 *       404:
 *         description: E-mail já está em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail já está em uso
 */


routes.use("/users", usersRoutes);
routes.use("/charges", ensureAuthenticated, chargesRoutes);

module.exports = routes;
