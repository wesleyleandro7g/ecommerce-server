const Product = require("../models/ProductModel");
const Company = require("../models/CompanyModel");

module.exports = {
  //### Cadastra um novo produto
  async create(req, res) {
    if (!(await Company.findById(req.params.companyId)))
      return res.status(404).send({ error: "Company not found" });

    try {
      const product = await Product.create({
        ...req.body,
        assignedToCompany: req.params.companyId,
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
        assignedToCompany: req.params.companyId,
      });

      return res.status(200).send({ products });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  //### Exibe um produto específico de um empresa
  async show(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) return res.status(404).send({ error: "Product not found" });

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

      if (!product) return res.status(404).send({ error: "Product not found" });

      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },

  //### Realiza o update de um produto
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndRemove(req.params.productId);

      if (!product) return res.status(404).send({ error: "Product not found" });

      return res.status(200).send({ Deleted: "Ok" });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
