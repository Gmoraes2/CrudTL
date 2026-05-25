const express = require("express");

const RegisterController = require("../controllers/register.controller");
const LoginController = require("../controllers/login.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Rotas de gerenciamento de acesso e usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "senhaForte123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou e-mail já em uso
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/register", RegisterController.handle);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica o usuário e retorna um token de acesso
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "senhaForte123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas (e-mail ou senha incorretos)
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/login", LoginController.handle);

module.exports = router;
