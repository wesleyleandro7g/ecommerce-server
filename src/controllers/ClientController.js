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

      return res.status(200).send({ newclient });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  },

  //### Exibe um cliente específico
  async show(req, res) {
    const _id = req.params.clientId;

    try {
      const client = await Client.findById({ _id });

      return res.status(200).send({ client });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### ALtera informações de um cliente
  async update(req, res) {
    const _id = req.params.clientId;

    try {
      const client = await Client.findOne({ _id });

      if (!client)
        return res.status(400).send({ error: "Cliente não encontrado" });

      const updateClient = await Client.findByIdAndUpdate(
        _id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(200).send({ updateClient });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  },

  //### Deleta um cliente
  async delete(req, res) {
    const _id = req.params.clientId;

    try {
      const client = await Client.findOneAndRemove({ _id });

      if (!client) return res.send({ error: "Cliente não encontrado" });

      return res.status(200).send({ error: "Cliente deletado" });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
