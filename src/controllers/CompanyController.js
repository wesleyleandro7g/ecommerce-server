const Company = require("../models/Empresa");
const User = require("../models/Usuario");
const Product = require("../models/Produto");

module.exports = {
  //### Cadastra uma nova empresa
  async create(req, res) {
    const { nome } = req.body;

    try {
      if (await Company.findOne({ nome }))
        return res.status(400).send({ error: "Empresa já cadastrada" });

      const newcompany = await Company.create(req.body);

      return res.status(200).send({ newcompany });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Lista os dados de todas as empresas
  async list(req, res) {
    try {
      const companys = await Company.find();

      if (!companys)
        return res.status(404).send({ error: "Nenhuma empresa cadastrada" });

      return res.status(200).send({ companys });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Lista os dados de uma empresa específica
  async show(req, res) {
    try {
      const company = await Company.findById(req.params.empresaId);

      if (!company)
        return res.status(404).send({ error: "Empresa não encontrada" });

      return res.status(200).send({ company });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Altera os dados cadastrais de uma empresa
  async update(req, res) {
    try {
      const company = await Company.findByIdAndUpdate(
        req.params.empresaId,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(200).send({ company });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Deleta uma empresa específica
  async delete(req, res) {
    const id_empresa = req.params.empresaId;

    try {
      const users = await User.find({ id_empresa });
      const products = await Product.find({ id_empresa });

      users.map(async (user) => {
        const _id = user._id;
        await User.findByIdAndRemove({ _id });
      });

      products.map(async (product) => {
        const _id = product._id;
        await Product.findByIdAndRemove({ _id });
      });

      await Company.findByIdAndRemove(req.params.empresaId);

      return res.status(200).send({ Deleted: "Ok" });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
