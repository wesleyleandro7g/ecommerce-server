const bcrypt = require("bcryptjs");

const Client = require("../models/Cliente");

module.exports = {
  //### Cadastra um novo usuário
  async create(req, res) {
    const { email } = req.body;

    try {
      const client = await Client.findOne({ email });

      if (client)
        return res.status(400).send({ error: "Cliente já cadastrado" });

      const newclient = await Client.create(req.body);

      newclient.senha = undefined;

      return res.status(200).send({ newclient });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### Exibe um cliente específico
  async show(req, res) {
    try {
      const _id = req.clientId.id;

      const client = await Client.findById({ _id });

      return res.status(200).send({ client });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### ALtera informações de um cliente
  async update(req, res) {
    try {
      const _id = req.clientId.id;
      var hash;
      const { senha } = req.body;

      const client = await (await Client.findOne({ _id })).isSelected("+senha");

      if (senha) {
        hash = await bcrypt.hash(senha, 10);
      } else {
        hash = user.senha;
      }

      if (!client)
        return res.status(400).send({ error: "Cliente não encontrado" });

      const updateClient = await Client.findByIdAndUpdate(
        _id,
        {
          ...req.body,
          senha: hash,
        },
        { new: true }
      );

      return res.status(200).send({ updateClient });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### Deleta um cliente
  async delete(req, res) {
    const _id = req.clientId.id;

    try {
      const client = await Client.findOneAndRemove({ _id });

      if (!client) return res.send({ error: "Cliente não encontrado" });

      return res.status(200).send({ Success: "Cliente deletado" });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },
};
