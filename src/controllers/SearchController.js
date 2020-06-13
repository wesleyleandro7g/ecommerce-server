const Product = require("../models/Produto");
const Company = require("../models/Empresa");
const Request = require("../models/Pedido");

module.exports = {
  //### Realiza busca de empresas
  async companysSearch(req, res) {
    try {
      const { company } = req.body;

      const results = await Company.find({ nome: company });

      if (results.length == 0)
        return res.status(404).send({ error: "Nenhuma empresa encontrada" });

      return res.status(200).send({ results });
    } catch (error) {
      return res.status(400).send({ error: error.mensage });
    }
  },

  //### Realiza busca de produtos
  async productsSearch(req, res) {
    try {
      const { product } = req.body;

      const results = await Product.find({ nome: product });

      if (results.length == 0)
        return res.status(404).send({ error: "Nenhum produto encontrado" });

      return res.status(200).send({ results });
    } catch (error) {
      return res.status(400).send({ error: error.mensage });
    }
  },
};
