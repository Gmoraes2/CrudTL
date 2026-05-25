// src/componentes/Tasks.jsx
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tasks({ tasks }) {
  const navigate = useNavigate();

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-slate-400 text-center mt-6">
        Nenhuma tarefa encontrada.
      </p>
    );
  }

  return (
    <ul className="space-y-3 mt-6">
      {tasks.map((task) => (
        <li
          key={task._id}
          onClick={() => navigate(`/tarefa/${task._id}`)}
          className="bg-slate-800 p-4 rounded-lg flex items-center justify-between shadow-sm border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors"
        >
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${task.status === "concluído" ? "line-through text-slate-500" : "text-slate-100"}`}
            >
              {task.title} {}
            </h3>
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-slate-600 text-slate-300 rounded capitalize">
              {task.status}
            </span>
          </div>
          <div className="text-slate-400">
            <ChevronRight size={20} />
          </div>
        </li>
      ))}
    </ul>
  );
}
