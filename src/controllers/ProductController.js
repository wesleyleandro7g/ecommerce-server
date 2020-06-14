require("dotenv").config();

const aws = require("aws-sdk");

const s3 = new aws.S3();

const Product = require("../models/Produto");
const Company = require("../models/Empresa");

module.exports = {
  //### Cadastra um novo produto
  async create(req, res) {
    try {
      const _id = req.userPayload.empresa;

      if (!(await Company.findById(_id)))
        return res.status(404).send({ error: "Empresa não encontrada" });

      const product = await Product.create({
        ...req.body,
        imagem: req.file ? req.file.key : "",
        imagemURL: req.file ? req.file.location : "",
        id_empresa: _id,
      });

      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  //### Lista todos os produtos de uma empresa
  async list(req, res) {
    try {
      const products = await Product.find({
        id_empresa: req.params.companyId,
      });

      const count = products.length;

      if (count === 0)
        return res.status(404).send({ NOTFOUND: "Nenhum produto encontrado" });

      return res.status(200).send({ TOTAL: count, products });
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

  //### Deleta um produto
  async delete(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product)
        return res.status(404).send({ error: "Produto não encontrado" });

      if (process.env.STORAGE_TYPE === "s3") {
        s3.deleteObject({
          Bucket: "desencoder-ecommerce",
          Key: product.imagem,
        }).promise();
      }

      await Product.findByIdAndRemove(req.params.productId);

      return res.status(200).send({ Success: "Produto deletado" });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
