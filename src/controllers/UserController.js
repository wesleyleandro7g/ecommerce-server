const User = require("../models/Usuario");

module.exports = {
  //### Cadastra um novo usuário
  async create(req, res) {
    const { empresaId } = req.params;
    const { email } = req.body;

    try {
      //if (!(await User.findOne({ id_empresa })));

      if (await User.findOne({ email }))
        return res.status(400).send({ error: "Usuário já cadastrado" });

      const newuser = await User.create(req.body);

      return res.status(200).send({ newuser });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Lista os usuários de uma empresa
  async list(req, res) {
    try {
      const users = await User.find();

      if (!users)
        return res.status(404).send({ error: "Usuário não encontrado" });

      return res.status(200).send({ users });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
