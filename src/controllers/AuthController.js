require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../models/Usuario");
const Client = require("../models/Cliente");

const jwtGenerate = require("../config/jwtGenerate");
const jwtVerify = require("../config/jwtVerify");

module.exports = {
  //### Autenticação dos usuários
  async userAuthenticate(req, res) {
    const { nome, senha } = req.body;
    const id_empresa = req.params.empresaId;

    const user = await User.findOne({ nome, id_empresa }).select("+senha");

    try {
      if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

      if (!(await bcrypt.compare(senha, user.senha)))
        return res.status(400).send({ error: "Senha inválida" });

      user.senha = undefined;

      const payload = {
        id: user._id,
        nome: user.nome,
        empresa: user.id_empresa,
        email: user.email,
        admin: user.administrador,
      };

      const token = await jwtGenerate.sign(
        payload,
        process.env.AUTH_USER,
        8400
      );

      return res.status(200).send({ user, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },

  //### Autenticação dos clientes
  async clientAuthenticate(req, res) {
    const { email, senha } = req.body;

    const client = await Client.findOne({ email }).select("+senha");

    try {
      if (!client)
        return res.status(404).send({ error: "Cliente não encontrado" });

      if (!(await bcrypt.compare(senha, client.senha)))
        return res.status(400).send({ error: "Senha inválida" });

      client.senha = undefined;

      const payload = {
        id: client._id,
        nome: client.nome,
        email: client.email,
      };

      const token = await jwtGenerate.sign(
        payload,
        process.env.AUTH_CLIENT,
        8400
      );

      return res.status(200).send({ client, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },

  //### Atualiza token de usuários
  async userRefreshToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      const decoded = await jwtVerify(res, authHeader, process.env.AUTH_USER);

      const payload = {
        id: decoded.id,
        nome: decoded.nome,
        empresa: decoded.empresa,
        email: decoded.email,
        admin: decoded.admin,
      };

      const token = await jwtGenerate.sign(
        payload,
        process.env.AUTH_USER,
        8400
      );

      return res
        .status(200)
        .send({ Refreshed: "Token atualizado", token: token });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  //### Atualiza token de clientes
  async clientRefreshToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      const decoded = await jwtVerify(res, authHeader, process.env.AUTH_CLIENT);

      const payload = {
        id: decoded.id,
        nome: decoded.nome,
        email: decoded.email,
      };

      const token = await jwtGenerate.sign(
        payload,
        process.env.AUTH_CLIENT,
        8400
      );

      return res
        .status(200)
        .send({ Refreshed: "Token atualizado", token: token });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
