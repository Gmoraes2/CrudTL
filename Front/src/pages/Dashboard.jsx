// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import Title from "../componentes/Title.jsx";
import AddTasks from "../componentes/AddTasks.jsx";
import Tasks from "../componentes/Tasks.jsx";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  };

  const handleAddTask = async (title, description, status) => {
    try {
      await api.post("/tasks", {
        title,
        description,
        status,
      });

      fetchTasks();
    } catch (error) {
      alert("Erro ao adicionar tarefa");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <header className="flex justify-between items-center mb-8">
          <Title>Minhas Tarefas</Title>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-700 transition"
          >
            Sair <LogOut size={18} />
          </button>
        </header>

        <main>
          <AddTasks onAdd={handleAddTask} />
          <Tasks tasks={tasks} />
        </main>
      </div>
    </div>
  );
}
