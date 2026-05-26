# 📋 Crud Task List

> Aplicação web completa para gerenciamento de tarefas com autenticação segura e deploy em nuvem.
🚀 **[Acessar aplicação em produção](http://ec2-18-225-182-159.us-east-2.compute.amazonaws.com/)**

---

## 📖 Visão Geral

O **Crud Task List** permite que usuários criem contas, realizem login seguro e gerenciem suas listas de atividades diárias de forma totalmente isolada.

-  **Isolamento de Dados:** Cada usuário visualiza e gerencia exclusivamente as suas próprias tarefas.
-  **Status de Tarefas:** Ciclo de vida completo — `Pendente`, `Em andamento`, `Concluído`.
-  **Segurança:** Autenticação via JWT com proteção de rotas no front-end e back-end.

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Uso |
|---|---|
| React 18 + Vite | Core da aplicação |
| Tailwind CSS + PostCSS | Estilização |
| React Router DOM | Roteamento (com `PrivateRoute`) |
| Axios | Comunicação HTTP |
| Lucide React | Ícones |
| React Hot Toast | Notificações |

### Backend & API
| Tecnologia | Uso |
|---|---|
| Node.js 24 + Express 5 | Core da API |
| MongoDB + Mongoose | Banco de dados |
| JWT + Bcrypt | Autenticação e hash de senhas |
| Jest + Supertest | Testes automatizados |
| Swagger | Documentação interativa da API |

### Infraestrutura & Cloud
| Tecnologia | Uso |
|---|---|
| Docker + Docker Compose | Containerização e orquestração |
| Nginx (Alpine) | Servidor web do frontend |
| AWS EC2 | Instância Linux em nuvem |

---

## 🔌 Endpoints da API

| Endpoint | Método | Descrição | Autenticado |
|---|---|---|---|
| `/register` | `POST` | Criação de um novo usuário | ❌ |
| `/login` | `POST` | Autenticação — retorna o token JWT | ❌ |
| `/tasks` | `GET` | Lista todas as tarefas do usuário logado | ✅ |
| `/tasks` | `POST` | Cria uma nova tarefa associada ao usuário | ✅ |
| `/tasks/:id` | `PUT` | Atualiza os dados de uma tarefa (ex: status) | ✅ |
| `/tasks/:id` | `DELETE` | Remove a tarefa do banco de dados | ✅ |

> A documentação interativa está disponível via **Swagger UI** na rota de documentação da API.

---

## ✅ Testes Automatizados

A aplicação possui uma suíte de testes configurada com **Jest** e **Supertest**, com foco na confiabilidade da rota de autenticação (`/login`).

**Cenários cobertos:**
- ✔️ Resposta a credenciais válidas
- ✔️ Bloqueio de tentativas com senha incorreta
- ✔️ Bloqueio de usuários inexistentes

```bash
# Executar dentro do diretório /Back
npm test
```

---

## ⚙️ Execução Local com Docker

O projeto sobe com um único comando, sem necessidade de instalar dependências de Node ou configurar o Nginx manualmente.

### Passo 1 — Variáveis de Ambiente

Na raiz do diretório `Back/`, crie um arquivo `.env`:

```env
DB_USER=seu_usuario_mongo
DB_PASSWORD=sua_senha_mongo
JWT_SECRET=sua_chave_secreta_super_segura
```

### Passo 2 — Iniciar os Contêineres

Na raiz do projeto (onde o `docker-compose.yml` está localizado):

```bash
docker-compose up -d --build
```

---

## 🏗️ Arquitetura Docker

A estrutura de contêineres foi projetada visando performance e segurança com imagens base **Alpine**.

- **Frontend Dockerfile:** Multi-stage build — o Node compila os arquivos estáticos com Vite, e a pasta `/dist` é copiada para uma imagem Nginx minimalista, reduzindo o tamanho final do contêiner.
- **Backend Dockerfile:** Otimizado instalando apenas dependências de produção (`npm ci --only=production`).
- **Docker Compose:** Orquestra portas, carrega variáveis de ambiente de forma segura e garante que o front-end só inicie após o back-end (`depends_on`).

---

## 📐 Arquitetura da API

O backend segue o padrão **MVC** (Models, Views/Routes, Controllers) com middlewares dedicados para interceptar e validar tokens de acesso JWT.

---

*Documentação Técnica Oficial — V2*
