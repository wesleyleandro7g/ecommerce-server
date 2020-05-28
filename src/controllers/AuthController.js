const bcrypt = require("bcryptjs");

const User = require("../models/Usuario");
const Client = require("../models/Cliente");

const jwt = require("../config/jwt");

module.exports = {
  async userAuthenticate(req, res) {
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
  async clientAuthenticate(req, res) {
    const { email, senha } = req.body;

    const client = await Client.findOne({ email }).select("+senha");

    try {
      if (!client)
        return res.status(404).send({ error: "Cliente não encontrado" });

      if (!(await bcrypt.compare(senha, client.senha)))
        return res.status(400).send({ error: "Senha inválida" });

      client.senha = undefined;

      const token = await jwt.sign(client.id);

      return res.status(200).send({ client, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },
};
