// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import Title from "../componentes/Title.jsx";
import Input from "../componentes/Input.jsx";
import Button from "../componentes/Button.jsx";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      alert("Usuário cadastrado com sucesso! Faça login para continuar.");
      navigate("/");
    } catch (err) {
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-xl">
        <Title>Criar Conta</Title>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />

          <Input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />

          <Button type="submit">Cadastrar</Button>
        </form>
        <p className="text-slate-400 text-center mt-4 text-sm">
          Já tem conta?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
