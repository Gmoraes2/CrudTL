const request = require("supertest");
const app = require("../../server");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/user.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("POST /login", () => {
  // ─── Cenário 1: login com sucesso
  it("deve retornar 200 e o token quando as credenciais estiverem corretas", async () => {
    UserModel.findOne.mockResolvedValue({
      _id: "abc123",
      name: "João",
      email: "joao@email.com",
      password: "hash_da_senha",
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token_fake_123");

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "joao@email.com", password: "senha123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe("token_fake_123");
    expect(res.body.user.email).toBe("joao@email.com");
    expect(res.body.message).toBe("Login realizado com sucesso!");
  });

  // ─── Cenário 2: e-mail não encontrado
  it("deve retornar 401 quando o e-mail não existir", async () => {
    UserModel.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "naoexiste@email.com", password: "qualquer" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("E-mail ou senha incorretos.");
  });

  // ─── Cenário 3: senha errada
  it("deve retornar 401 quando a senha estiver errada", async () => {
    UserModel.findOne.mockResolvedValue({
      _id: "abc123",
      email: "joao@email.com",
      password: "hash_da_senha",
    });

    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "joao@email.com", password: "senha_errada" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("E-mail ou senha incorretos.");
  });

  // ─── Cenário 4: erro interno
  it("deve retornar 500 quando ocorrer um erro inesperado", async () => {
    UserModel.findOne.mockRejectedValue(new Error("Erro no banco"));

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "joao@email.com", password: "senha123" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Erro interno do servidor.");
  });

  // ─── Cenário 5: body vazio
  it("deve retornar 401 quando o body estiver vazio", async () => {
    UserModel.findOne.mockResolvedValue(null);

    const res = await request(app).post("/auth/login").send({});

    expect(res.status).toBe(401);
  });
});
