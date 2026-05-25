require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description:
        "Documentação da API de autenticação e gerenciamento de tarefas",
    },
    servers: [{ url: "http://localhost:3000/", description: "Servidor Local" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

if (process.env.NODE_ENV !== "test") {
  require("./src/database/connect")();
}

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("Documentação disponível em http://localhost:3000/api-docs");
  });
}

module.exports = app;
