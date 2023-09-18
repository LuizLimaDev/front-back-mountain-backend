const { Router } = require("express");
const customersRoutes = Router();
const { validateRequestBody } = require("../middlewares/validateRequestBody");
const customersSchema = require("../schemas/customersSchema");

const {
	listCustomers,
	listCustomersMetrics,
	createCustomers,
} = require("../controllers/customersController");

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Rota para cadastrar um cliente.
 *     tags:
 *       - customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Um objeto contendo informações do cliente.
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
 *                 example: test@email.com
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               phone:
 *                 type: string
 *                 example: (11) 9 9999-9999
 *               zipcode:
 *                 type: string
 *                 example: 12345678
 *               street:
 *                 type: string
 *                 example: 123 Rua Cubos
 *               complement:
 *                 type: string
 *                 example: Apt 07
 *               neighborhood:
 *                 type: string
 *                 example: Mountain
 *               city:
 *                 type: string
 *                 example: Salvador
 *               state:
 *                 type: string
 *                 example: Bahia
 *             required:
 *               - name
 *               - email
 *               - cpf
 *               - phone
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 6
 *                       name:
 *                         type: string
 *                         example: test
 *                       email:
 *                         type: string
 *                         example: test@email.com
 *                       cpf:
 *                         type: string
 *                         example: 123.456.789-00
 *                       phone:
 *                         type: string
 *                         example: (11) 9 9999-9999
 *                       zipcode:
 *                         type: string
 *                         example: 1245678
 *                       street:
 *                         type: string
 *                         example: 123 Rua Cubos
 *                       complement:
 *                         type: string
 *                         example: Apt 07
 *                       neighborhood:
 *                         type: string
 *                         example: Mountain
 *                       city:
 *                         type: string
 *                         example: Salvador
 *                       state:
 *                         type: string
 *                         example: Bahia
 *             example:
 *               customer:
 *                 - id: 6
 *                   name: "Maria"
 *                   email: "maria@email.com"
 *                   cpf: "123.456.789-11"
 *                   phone: "(11) 9 9999-9999"
 *                   zipcode: "12345678"
 *                   street: "Rua Cubos"
 *                   complement: "Apt 07"
 *                   neighborhood: "Mountain"
 *                   city: "Salvador"
 *                   state: "Bahia"
 *       400:
 *         description: Erros de validação no cadastro do cliente.
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
 *               "O campo email é obrigatório":
 *                 value:
 *                   message: O campo email é obrigatório
 *               "O campo email precisa ter um formato válido":
 *                 value:
 *                   message: O campo email precisa ter um formato válido
 *               "O campo cpf é obrigatório":
 *                 value:
 *                   message: O campo cpf é obrigatório
 *               "O campo telefone é obrigatório":
 *                 value:
 *                   message: O campo telefone é obrigatório
 *               "O campo nome precisa ter no mínimo 3 caracteres":
 *                 value:
 *                   message: O campo nome precisa ter no mínimo 3 caracteres
 *               "O tamanho do CEP deve ser de 8 caracteres":
 *                 value:
 *                   message: O tamanho do CEP deve ser de 8 caracteres
 */

customersRoutes.post(
	"/",
	validateRequestBody(customersSchema),
	createCustomers
);
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Rota para listar os clientes.
 *     tags:
 *       - customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: test
 *                       email:
 *                         type: string
 *                         example: test@email.com
 *                       cpf:
 *                         type: string
 *                         example: 123.456.789-00
 *                       phone:
 *                         type: string
 *                         example: (11) 9 9999-9999
 *                       zipcode:
 *                         type: string
 *                         example: 1245678
 *                       street:
 *                         type: string
 *                         example: 123 Rua Cubos
 *                       complement:
 *                         type: string
 *                         example: Apt 07
 *                       neighborhood:
 *                         type: string
 *                         example: Mountain
 *                       city:
 *                         type: string
 *                         example: Salvador
 *                       state:
 *                         type: string
 *                         example: Bahia
 *             example:
 *               customers:
 *                 - id: 1
 *                   name: "Maria"
 *                   email: "maria@email.com"
 *                   cpf: "123.456.789-11"
 *                   phone: "(71) 9 9999-9999"
 *                   zipcode: "13342658"
 *                   street: "Rua Cubos"
 *                   complement: "Apt 07"
 *                   neighborhood: "Mountain"
 *                   city: "Salvador"
 *                   state: "Bahia"
 *                 - id: 2
 *                   name: "Carla"
 *                   email: "carla@email.com"
 *                   cpf: "321.654.987-00"
 *                   phone: "(11) 9 9999-9999"
 *                   zipcode: "87654321"
 *                   street: "Rua Gamer"
 *                   complement: "Apt 1207"
 *                   neighborhood: "Brotas"
 *                   city: "Campinas"
 *                   state: "São Paulo"
 *                 - id: 3
 *                   name: "Pedro"
 *                   email: "pedro@email.com"
 *                   cpf: "231.453.645-24"
 *                   phone: "(41) 9 9123-2345"
 *                   zipcode: "32325671"
 *                   street: "Rua Rodas"
 *                   complement: "Apt 701"
 *                   neighborhood: "Horto"
 *                   city: "Belo Horizonte"
 *                   state: "Minas Gerais"
 *                 - id: 4
 *                   name: "Ana"
 *                   email: "ana@email.com"
 *                   cpf: "829.413.811-12"
 *                   phone: "(31) 9 9921-9321"
 *                   zipcode: "14345121"
 *                   street: "Rua Gatos"
 *                   complement: "Apt 901"
 *                   neighborhood: "Federação"
 *                   city: "Belém"
 *                   state: "Pará"
 *                 - id: 5
 *                   name: "João"
 *                   email: "joão@email.com"
 *                   cpf: "213.411.444-57"
 *                   phone: "(62) 9 9776-4618"
 *                   zipcode: "62145893"
 *                   street: "Rua Felinos"
 *                   complement: "Apt 61"
 *                   neighborhood: "Pituba"
 *                   city: "Manaus"
 *                   state: "Amazonas"
 *                 - id: 6
 *                   name: "Joaquina"
 *                   email: "joaquina@email.com"
 *                   cpf: "654.378.935-92"
 *                   phone: "(82) 9 9678-4578"
 *                   zipcode: "32189657"
 *                   street: "Rua Canis"
 *                   complement: "Apt 601"
 *                   neighborhood: "Cajazeiras"
 *                   city: "Fortaleza"
 *                   state: "Ceará"
 */

customersRoutes.get("/", listCustomers);
customersRoutes.get("/metrics", listCustomersMetrics);

/**
 * @swagger
 * /customers/metrics:
 *   get:
 *     summary: Rota para obter métricas dos clientes.
 *     tags:
 *       - customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas dos clientes obtidos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 defaulters:
 *                   type: object
 *                   properties:
 *                     defaultersTotal:
 *                       type: number
 *                       example: 100
 *                     defaultersList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           customer:
 *                             type: string
 *                             example: "Maria"
 *                           customerid:
 *                             type: number
 *                             example: 1
 *                           cpf:
 *                             type: string
 *                             example: "123.456.789.11"
 *                 paymentsOn:
 *                   type: object
 *                   properties:
 *                     paymentsOnTotal:
 *                       type: number
 *                       example: 200
 *                     paymentsOnList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           customer:
 *                             type: string
 *                             example: "João"
 *                           customerid:
 *                             type: number
 *                             example: 3
 *                           cpf:
 *                             type: string
 *                             example: "131.411.543.71"
 *             example:
 *               defaulters:
 *                 defaultersTotal: 100
 *                 defaultersList:
 *                   - id: 1
 *                     customer: "Pedro"
 *                     customerid: 2
 *                     cpf: "910.123.432-91"
 *                   - id: 2
 *                     customer: "João"
 *                     customerid: 3
 *                     cpf: "321.513.411-31"
 *               paymentsOn:
 *                 paymentsOnTotal: 200
 *                 paymentsOnList:
 *                   - id: 5
 *                     customer: "Maria"
 *                     customerid: 1
 *                     cpf: "456.545.654.88"
 *                   - id: 6
 *                     customer: "José"
 *                     customerid: 2
 *                     cpf: "546.312.311.34"
 */

module.exports = customersRoutes;
