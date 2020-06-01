const bcrypt = require("bcryptjs");

const User = require("../models/Usuario");
const Company = require("../models/Empresa");

module.exports = {
  //### Cadastra um novo usuário
  async create(req, res) {
    const _id = req.userPayload.empresa;
    const { nome } = req.body;

    try {
      if (!(await Company.findById({ _id })))
        return res.status(404).send({ error: "Empresa não encontrada" });

      if (!req.userPayload.admin)
        return res.status(401).send({
          Negado: "Usuário não possui permissão para realizar essa operação",
        });

      const user = await User.findOne({ nome, id_empresa: _id });

      if (user) return res.status(400).send({ error: "Usuário já cadastrado" });

      const newuser = await User.create({ ...req.body, id_empresa: _id });

      newuser.senha = undefined;

      return res.status(200).send({ newuser });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  },

  //### Lista os usuários de uma empresa
  async list(req, res) {
    const id_empresa = req.userPayload.empresa;

    try {
      if (!req.userPayload.admin)
        return res.status(401).send({
          Negado: "Usuário não possui permissão para realizar essa operação",
        });

      const users = await User.find({ id_empresa });

      const count = users.length;

      if (count === 0)
        return res.status(404).send({ NOTFOUND: "Nenhum usuario encontrado" });

      return res.status(200).send({ TOTAL: count, users });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Exibe um usuário específico
  async show(req, res) {
    const _id = req.params.userId;

    try {
      const user = await User.findById({ _id });

      return res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### ALtera informações de um usuário
  async update(req, res) {
    try {
      var hash;
      const { senha } = req.body;

      const user = await User.findById(req.userPayload.id).select("+senha");

      if (senha) {
        hash = await bcrypt.hash(senha, 10);
      } else {
        hash = user.senha;
      }

      if (!user)
        return res.status(400).send({ error: "Usuário não encontrado" });

      const updateUser = await User.findByIdAndUpdate(
        req.userPayload.id,
        {
          ...req.body,
          senha: hash,
        },
        { new: true }
      );

      return res.status(200).send({ updateUser });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: error.message });
    }
  },

  //### Deleta um usuário
  async delete(req, res) {
    const _id = req.params.userId;
    const id_empresa = req.userPayload.empresa;

    try {
      if (!req.userPayload.admin)
        return res.status(401).send({
          Negado: "Usuário não possui permissão para realizar essa operação",
        });

      const user = await User.findOneAndRemove({ _id, id_empresa });

      if (!user) return res.send({ error: "Usuário não encontrado" });

      return res.status(200).send({ Success: "Usuário deletado" });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
