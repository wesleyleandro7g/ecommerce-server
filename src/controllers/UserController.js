const User = require("../models/Usuario");
const Company = require("../models/Empresa");

module.exports = {
  //### Cadastra um novo usuário
  async create(req, res) {
    const _id = req.params.empresaId;
    const { email } = req.body;

    try {
      if (!(await Company.findById({ _id })))
        return res.status(404).send({ error: "Empresa não encontrada" });

      const user = await User.findOne({ email, id_empresa: _id });

      if (user) return res.status(400).send({ error: "Usuário já cadastrado" });

      const newuser = await User.create({ ...req.body, id_empresa: _id });

      return res.status(200).send({ newuser });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  },

  //### Lista os usuários de uma empresa
  async list(req, res) {
    const id_empresa = req.params.empresaId;

    try {
      const users = await User.find({ id_empresa }).populate("Empresa");

      if (!users)
        return res.status(404).send({ error: "Usuário não encontrado" });

      return res.status(200).send({ users });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
