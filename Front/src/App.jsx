import { Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";

export default function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col p-4">
        <h2 className="text-2xl font-bold text-blue-500 mb-8 text-center">
          TaskApp
        </h2>

        <nav className="flex-1 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-md bg-slate-700 text-white transition-colors"
          >
            <Home size={20} />
            Meu Dashboard
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-3 mt-auto bg-slate-700 hover:bg-red-600 rounded-md transition-colors w-full"
        >
          <LogOut size={20} />
          Sair do Sistema
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
