require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../models/Usuario");
const Client = require("../models/Cliente");
const Company = require("../models/Empresa");

const jwt = require("../config/jwt");

module.exports = {
  //### Autenticação do administrador
  async AdminAuthenticate(req, res) {
    const { senha } = req.body;
    const _id = req.params.empresaId;

    const company = await Company.findOne({ _id }).select("+senha");

    try {
      if (!company)
        return res.status(404).send({ error: "Empresa não encontrada" });

      if (!(await bcrypt.compare(senha, company.senha)))
        return res.status(400).send({ error: "Senha inválida" });

      company.senha = undefined;

      const token = await jwt.sign(company.id, process.env.AUTH_COMPANY);

      return res.status(200).send({ company, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },

  //### Autenticação dos usuários
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

      const token = await jwt.sign(user.id, process.env.AUTH_USER);

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

      const token = await jwt.sign(client.id, process.env.AUTH_CLIENT);

      return res.status(200).send({ client, token: token });
    } catch (error) {
      return res.status(400).send({ error: "Falha ao autenticar" });
    }
  },
};
