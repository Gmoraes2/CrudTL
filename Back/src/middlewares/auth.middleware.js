const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  // 2. Verifica se o token é válido e não expirou
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Salva o ID do usuário na requisição para podermos usar nos controllers de Tarefas depois!
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
