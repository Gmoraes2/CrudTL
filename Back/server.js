require("dotenv").config();
require("./src/database/connect")();
const cors = require("cors");

const express = require("express");

const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`ALARME: Alguém tentou acessar -> ${req.method} ${req.url}`);
  next();
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
