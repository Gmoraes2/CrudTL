const express = require("express");
const TaskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas do usuário autenticado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1a2b3c4d5e6f7a8b9c0d"
 *         title:
 *           type: string
 *           example: "Estudar Node.js"
 *         description:
 *           type: string
 *           example: "Revisar conceitos de middlewares e rotas"
 *         status:
 *           type: string
 *           enum: [pending, in_progress, done]
 *           example: "pending"
 *         userId:
 *           type: string
 *           example: "663e0a1b2c3d4e5f6a7b8c9d"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-25T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-25T12:00:00.000Z"
 *
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: "Estudar Node.js"
 *         description:
 *           type: string
 *           example: "Revisar conceitos de middlewares e rotas"
 *
 *     TaskUpdateInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Estudar Node.js avançado"
 *         description:
 *           type: string
 *           example: "Focar em streams e eventos"
 *         status:
 *           type: string
 *           enum: [pending, in_progress, done]
 *           example: "in_progress"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Erro interno."
 *
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Operação realizada com sucesso!"
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autorizado — token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Token inválido ou não fornecido."
 *       500:
 *         description: Erro interno ao buscar tarefas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Erro interno ao buscar tarefas."
 */
router.get("/", TaskController.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa criada com sucesso!"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autorizado — token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Token inválido ou não fornecido."
 *       500:
 *         description: Erro interno ao criar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Erro interno ao criar tarefa."
 */
router.post("/", TaskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: string
 *           example: "664f1a2b3c4d5e6f7a8b9c0d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdateInput'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa atualizada com sucesso!"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autorizado — token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Token inválido ou não fornecido."
 *       404:
 *         description: Tarefa não encontrada ou acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Tarefa não encontrada ou acesso negado."
 *       500:
 *         description: Erro interno ao atualizar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Erro interno ao atualizar tarefa."
 */
router.put("/:id", TaskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletar uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: string
 *           example: "664f1a2b3c4d5e6f7a8b9c0d"
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               message: "Tarefa deletada com sucesso!"
 *       401:
 *         description: Não autorizado — token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Token inválido ou não fornecido."
 *       404:
 *         description: Tarefa não encontrada ou acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Tarefa não encontrada ou acesso negado."
 *       500:
 *         description: Erro interno ao deletar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Erro interno ao deletar tarefa."
 */
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
