const { Router } = require("express");
const chargesRoutes = Router();
const { validateRequestBody } = require("../middlewares/validateRequestBody");
const {
	chargesSchema,
	updateChargesSchema,
} = require("../schemas/chargesSchema");

const {
	createCharges,
	listCharges,
	listChargesMetrics,
	updateCharges,
} = require("../controllers/chargesController");

/**
 * @swagger
 * /charges:
 *   post:
 *     summary: Rota para cadastrar uma cobrança.
 *     tags:
 *       - charges
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Um objeto contendo informações de cobrança.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: test
 *               description:
 *                 type: string
 *                 example: pagar as contas
 *               dueDate:
 *                 type: string
 *                 example: 2023-10-10
 *               status:
 *                 type: string
 *                 example: "pago"
 *             required:
 *               - customerId
 *               - name
 *               - description
 *               - dueDate
 *               - status
 *     responses:
 *       201:
 *         description: Cobrança criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 charge:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 6
 *                       customerid:
 *                         type: number
 *                         example: 1
 *                       value:
 *                         type: number
 *                         example: 100
 *                       duedate:
 *                         type: string
 *                         example: "2024-05-20T00:00:00.000Z"
 *                       description:
 *                         type: string
 *                         example: pagar a conta
 *                       status:
 *                         type: string
 *                         example: "pendente"
 *                       name:
 *                         type: string
 *                         example: Test
 *             example:
 *               charge:
 *                 - id: 6
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2024-05-20T00:00:00.000Z"
 *                   description: "pagar a conta"
 *                   status: "pendente"
 *                   name: "Test"
 *       400:
 *         description: Erros de validação no cadastro da cobrança.
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
 *               "O campo customerid é obrigatório":
 *                 value:
 *                   message: O campo customerid é obrigatório
 *               "O campo descrição é obrigatório":
 *                 value:
 *                   message: O campo descrição é obrigatório
 *               "O campo data é obrigatório":
 *                 value:
 *                   message: O campo data é obrigatório
 *               "O campo status é obrigatório":
 *                 value:
 *                   message: O campo status é obrigatório
 *               "O campo de valor precisa ser positivo":
 *                 value:
 *                   message: O campo de valor precisa ser positivo
 */

chargesRoutes.post("/", validateRequestBody(chargesSchema), createCharges);
/**
 * @swagger
 * /charges:
 *   get:
 *     summary: Rota para listar as cobranças.
 *     tags:
 *       - charges
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cobranças obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 charges:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       customerid:
 *                         type: number
 *                         example: 1
 *                       value:
 *                         type: number
 *                         example: 100
 *                       duedate:
 *                         type: string
 *                         example: "2023-05-20T00:00:00.000Z"
 *                       description:
 *                         type: string
 *                         example: Pagar a conta de eletricidade
 *                       status:
 *                         type: string
 *                         example: "pendente"
 *                       name:
 *                         type: string
 *                         example: João
 *             example:
 *               charges:
 *                 - id: 1
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2023-05-20T00:00:00.000Z"
 *                   description: "Pagar a conta de eletricidade"
 *                   status: "pendente"
 *                   name: "João"
 *                 - id: 2
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2023-05-20T00:00:00.000Z"
 *                   description: "Pagar a conta de água"
 *                   status: "vencido"
 *                   name: "Maria"
 *                 - id: 3
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2023-05-20T00:00:00.000Z"
 *                   description: "Pagar o aluguel"
 *                   status: "pendente"
 *                   name: "Pedro"
 *                 - id: 4
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2023-05-20T00:00:00.000Z"
 *                   description: "Pagar o gás"
 *                   status: "pago"
 *                   name: "Ana"
 *                 - id: 5
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2024-05-20T00:00:00.000Z"
 *                   description: "Pagar a internet"
 *                   status: "pendente"
 *                   name: "Luiz"
 *                 - id: 6
 *                   customerid: 1
 *                   value: 100
 *                   duedate: "2024-05-20T00:00:00.000Z"
 *                   description: "Pagar a TV a cabo"
 *                   status: "pendente"
 *                   name: "Carla"
 */

chargesRoutes.get("/", listCharges);
chargesRoutes.get("/metrics", listChargesMetrics);

/**
 * @swagger
 * /charges/metrics:
 *   get:
 *     summary: Rota para obter métricas das cobranças.
 *     tags:
 *       - charges
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas das cobranças obtidas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paid:
 *                   type: object
 *                   properties:
 *                     paidTotal:
 *                       type: number
 *                       example: 100
 *                     paidCount:
 *                       type: number
 *                       example: 1
 *                     paidList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 4
 *                           customerid:
 *                             type: number
 *                             example: 1
 *                           value:
 *                             type: number
 *                             example: 100
 *                           duedate:
 *                             type: string
 *                             example: "2023-05-20T00:00:00.000Z"
 *                           description:
 *                             type: string
 *                             example: "Pagar a Amanda"
 *                           status:
 *                             type: string
 *                             example: "pago"
 *                           name:
 *                             type: string
 *                             example: "João"
 *                 planned:
 *                   type: object
 *                   properties:
 *                     plannedTotal:
 *                       type: number
 *                       example: 200
 *                     plannedCount:
 *                       type: number
 *                       example: 2
 *                     plannedList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 5
 *                           customerid:
 *                             type: number
 *                             example: 1
 *                           value:
 *                             type: number
 *                             example: 100
 *                           duedate:
 *                             type: string
 *                             example: "2024-05-20T00:00:00.000Z"
 *                           description:
 *                             type: string
 *                             example: "Pagar a Amanda"
 *                           status:
 *                             type: string
 *                             example: "pendente"
 *                           name:
 *                             type: string
 *                             example: "Maria"
 *                 overdue:
 *                   type: object
 *                   properties:
 *                     overdueTotal:
 *                       type: number
 *                       example: 300
 *                     overdueCount:
 *                       type: number
 *                       example: 3
 *                     overdueList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 1
 *                           customerid:
 *                             type: number
 *                             example: 1
 *                           value:
 *                             type: number
 *                             example: 100
 *                           duedate:
 *                             type: string
 *                             example: "2023-05-20T00:00:00.000Z"
 *                           description:
 *                             type: string
 *                             example: "Pagar a Amanda"
 *                           status:
 *                             type: string
 *                             example: "vencido"
 *                           name:
 *                             type: string
 *                             example: "Pedro"
 *             example:
 *               paid:
 *                 paidTotal: 100
 *                 paidCount: 1
 *                 paidList:
 *                   - id: 4
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2023-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "pago"
 *                     name: "João"
 *               planned:
 *                 plannedTotal: 200
 *                 plannedCount: 2
 *                 plannedList:
 *                   - id: 5
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2024-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "pendente"
 *                     name: "Maria"
 *                   - id: 6
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2024-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "pendente"
 *                     name: "Carla"
 *               overdue:
 *                 overdueTotal: 300
 *                 overdueCount: 3
 *                 overdueList:
 *                   - id: 1
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2023-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "vencido"
 *                     name: "Pedro"
 *                   - id: 2
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2023-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "vencido"
 *                     name: "Joana"
 *                   - id: 3
 *                     customerid: 1
 *                     value: 100
 *                     duedate: "2023-05-20T00:00:00.000Z"
 *                     description: "Pagar a Amanda"
 *                     status: "vencido"
 *                     name: "Ricardo"
 */

chargesRoutes.put(
	"/:id",
	validateRequestBody(updateChargesSchema),
	updateCharges
);

module.exports = chargesRoutes;
