const User = require("../models/Usuario");
const Company = require("../models/Empresa");
const bcrypt = require("bcryptjs");

const jwt = require("../config/jwt");

module.exports = {
  async authenticate(req, res) {
    const { email, senha } = req.body;
    const id_empresa = req.params.empresaId;

    const user = await User.findOne({ email, id_empresa }).select("+senha");

    try {
      if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

      if (!(await bcrypt.compare(senha, user.senha)))
        return res.status(400).send({ error: "Senha inválida" });

      user.senha = undefined;

      const token = await jwt.sign(user.id);

      return res.status(200).send({ user, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },
};
