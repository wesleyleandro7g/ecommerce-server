const Product = require("../models/Produto");
const Company = require("../models/Empresa");

module.exports = {
  //### Cadastra um novo produto
  async create(req, res) {
    if (!(await Company.findById(req.params.companyId)))
      return res.status(404).send({ error: "Empresa não encontrada" });

    try {
      const product = await Product.create({
        ...req.body,
        id_empresa: req.params.companyId,
      });

      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  //### Lista todos os produtos de uma empresa
  async list(req, res) {
    try {
      const products = await Product.find({
        id_empresa: req.params.companyId,
      });

      if (!products) return res.status(404).send("Nenhum produto cadastrado");

      return res.status(200).send({ products });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  //### Exibe um produto específico de um empresa
  async show(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product)
        return res.status(404).send({ error: "Produto não encontrado" });

      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  //### Realiza o update de um produto
  async update(req, res) {
    try {
      const upDateProduct = req.body;

      const product = await Product.findOneAndUpdate(
        req.params.productId,
        {
          ...upDateProduct,
        },
        { new: true }
      );

      if (!product)
        return res.status(404).send({ error: "Produto não encontrado" });

      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },

  //### Realiza o update de um produto
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndRemove(req.params.productId);

      if (!product)
        return res.status(404).send({ error: "Produto não encontrado" });

      return res.status(200).send({ Success: "Produto deletado" });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
