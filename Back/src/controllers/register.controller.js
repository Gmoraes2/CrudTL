const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

class RegisterController {
  async handle(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não coincidem!" });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ message: "Usuário já existe." });
      }

      const user = new UserModel({
        name,
        email,
        password,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15mins",
      });

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", token });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

module.exports = new RegisterController();
