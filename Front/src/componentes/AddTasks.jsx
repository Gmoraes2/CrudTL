// src/componentes/AddTasks.jsx
import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { Plus } from "lucide-react";

export default function AddTasks({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Título e descrição são obrigatórios.");
      return;
    }

    onAdd(title, description, status);

    setTitle("");
    setDescription("");
    setStatus("pendente");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-lg shadow-md space-y-4"
    >
      <Input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div>
        <label className="text-slate-400 text-sm mb-1 block">
          Status Inicial
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 rounded-md outline-none bg-slate-50 text-slate-900 border border-slate-300 focus:ring-2 focus:ring-blue-500"
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>

      <Button type="submit">
        <Plus size={20} /> Adicionar Tarefa
      </Button>
    </form>
  );
}
