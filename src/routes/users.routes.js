const { Router } = require("express");
const usersRoutes = Router();
const { validateRequestBody } = require("../middlewares/validateRequestBody");
const {
	userSchema,
	sessionsUserSchema,
	editUsersSchema,
} = require("../schemas/userSchema");

const {
	createUsers,
	sessionsUsers,
	profileUsers,
	editUsers,
} = require("../controllers/usersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

usersRoutes.post("/", validateRequestBody(userSchema), createUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Rota para cadastrar um usuário.
 *     tags:
 *       - users
 *     requestBody:
 *       description: Um objeto contendo informações de usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: test
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: test@test.com
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erros de validação no cadastro do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               "O campo nome é obrigatório":
 *                 value:
 *                   message: O campo nome é obrigatório
 *               "O campo nome precisa ter no mínimo 3 caracteres.":
 *                 value:
 *                   message: O campo nome precisa ter no mínimo 3 caracteres.
 *               "O campo senha é obrigatório":
 *                 value:
 *                   message: O campo senha é obrigatório
 *               "A senha precisa conter, no mínimo, 5 caracteres":
 *                 value:
 *                   message: A senha precisa conter, no mínimo, 8 caracteres
 *               "A senha precisa conter, no máximo, 32 caracteres":
 *                 value:
 *                   message: A senha precisa conter, no máximo, 32 caracteres
 *               "O campo email precisa ter um formato válido":
 *                 value:
 *                   message: O campo email precisa ter um formato válido
 *               "O campo email é obrigatório":
 *                 value:
 *                   message: O campo email é obrigatório
 */


usersRoutes.put(
	"/",
	ensureAuthenticated,
	validateRequestBody(editUsersSchema),
	editUsers
);


/**
 * @swagger
 * /users/sessions:
 *   post:
 *     summary: Rota para autenticar um usuário.
 *     tags:
 *       - users
 *     requestBody:
 *       description: Um objeto contendo informações de email e senha.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: test@test.com
 *     responses:
 *       201:
 *         description: Objeto com o token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             examples:
 *               token:
 *                 value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4MDQ5NDcsImV4cCI6MTY5NDgzMzc0Nywic3ViIjoiMyJ9.fVKbgZY3jD75by4vebjdZ_R2k25Ui5aELMuaYLSx364
 *       400:
 *         description: Erros de validação no processo de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               "O campo senha é obrigatório":
 *                 value:
 *                   message: O campo senha é obrigatório
 *               "A senha precisa conter, no mínimo, 5 caracteres":
 *                 value:
 *                   message: A senha precisa conter, no mínimo, 8 caracteres
 *               "A senha precisa conter, no máximo, 32 caracteres":
 *                 value:
 *                   message: A senha precisa conter, no máximo, 32 caracteres
 *               "O campo email precisa ter um formato válido":
 *                 value:
 *                   message: O campo email precisa ter um formato válido
 *               "O campo email é obrigatório":
 *                 value:
 *                   message: O campo email é obrigatório
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               "Usuário não encontrado":
 *                 value:
 *                   message: Usuário não encontrado
 *       403:
 *         description: Senha inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               "Senha inválida":
 *                 value:
 *                   message: Senha inválida
 */




usersRoutes.post(
	"/sessions",
	validateRequestBody(sessionsUserSchema),
	sessionsUsers
);
usersRoutes.get("/profile", ensureAuthenticated, profileUsers);

module.exports = {
	usersRoutes,
};
