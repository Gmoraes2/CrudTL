const TaskModel = require("../models/tasks.model");

class TaskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.find({ userId: req.userId });
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      return res
        .status(500)
        .json({ message: "Erro interno ao buscar tarefas." });
    }
  }

  async createTask(req, res) {
    try {
      const { title, description } = req.body;

      const newTask = new TaskModel({
        title,
        description,
        userId: req.userId,
      });

      await newTask.save();
      return res
        .status(201)
        .json({ message: "Tarefa criada com sucesso!", task: newTask });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      return res.status(500).json({ message: "Erro interno ao criar tarefa." });
    }
  }

  async updateTask(req, res) {
    try {
      const taskId = req.params.id;

      const { title, description, status } = req.body;

      const task = await TaskModel.findOne({ _id: taskId, userId: req.userId });

      if (!task) {
        return res
          .status(404)
          .json({ message: "Tarefa não encontrada ou acesso negado." });
      }

      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;

      await task.save();

      return res
        .status(200)
        .json({ message: "Tarefa atualizada com sucesso!", task });
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      return res
        .status(500)
        .json({ message: "Erro interno ao atualizar tarefa." });
    }
  }

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id;

      const deletedTask = await TaskModel.findOneAndDelete({
        _id: taskId,
        userId: req.userId,
      });

      if (!deletedTask) {
        return res
          .status(404)
          .json({ message: "Tarefa não encontrada ou acesso negado." });
      }

      return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      return res
        .status(500)
        .json({ message: "Erro interno ao deletar tarefa." });
    }
  }
}

module.exports = new TaskController();
