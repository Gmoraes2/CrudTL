// src/pages/TaskDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import Title from "../componentes/Title.jsx";
import Input from "../componentes/Input.jsx";
import Button from "../componentes/Button.jsx";
import { ArrowLeft, Trash2, Save } from "lucide-react";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get("/tasks");

        const taskEncontrada = response.data.find(
          (t) => String(t._id) === String(id),
        );

        if (taskEncontrada) {
          setTitle(taskEncontrada.title);
          setDescription(taskEncontrada.description);
          setStatus(taskEncontrada.status);
        } else {
          alert("Tarefa não encontrada!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao carregar a tarefa", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, { title, description, status });
      alert("Tarefa atualizada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao atualizar a tarefa.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );
    if (!confirmar) return;

    try {
      await api.delete(`/tasks/${id}`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao excluir a tarefa.");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Carregando...</p>;

  return (
    <div className="w-screen min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-slate-800 p-8 rounded-lg shadow-xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <Title>Detalhes da Tarefa</Title>

        <form onSubmit={handleUpdate} className="space-y-4 mt-6">
          <div>
            <label className="text-slate-300 text-sm mb-1 block">Título</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block">
              Descrição
            </label>
            <textarea
              className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 resize-none"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block">Status</label>
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

          <div className="flex gap-4 pt-4">
            <Button type="submit">
              <Save size={20} /> Salvar Alterações
            </Button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={20} /> Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
