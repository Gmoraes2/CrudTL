import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import Title from "../componentes/Title.jsx";
import Input from "../componentes/Input.jsx";
import Button from "../componentes/Button.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Email ou senha inválidos. Por favor, tente novamente.");
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-xl">
        <Title>Entrar</Title>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit">Acessar Sistema</Button>
        </form>
        <p className="text-slate-400 text-center mt-4 text-sm">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
