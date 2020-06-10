const Request = require("../models/Pedido");
const Producs = require("../models/Produto");
const Company = require("../models/Empresa");

module.exports = {
  //### Realiza um novo pedido
  async create(req, res) {
    try {
      const id_empresa = req.params.empresaId;
      const id_cliente = req.clientId.id;

      if (!id_empresa)
        return res.status(400).send({ error: "Informe a empresa" });

      const empresa = await Company.findById(id_empresa);
      if (!empresa)
        return res.status(400).send({ error: "Empresa não encontrada" });

      // const { produtos } = req.body;

      // const retorno = produtos.map(async (index) => {
      //   const productRequest = await Producs.findById(index);

      //   if (productRequest.id_empresa != req.params.empresaId) {
      //     return `O produto ${productRequest.nome} não pertence a essa empresa`;
      //   }
      // });

      // console.log(retorno);

      const newrequest = await Request.create({
        ...req.body,
        id_empresa: id_empresa,
        id_cliente: id_cliente,
      });

      return res.status(200).send({ newrequest });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  //### Lista todos os pedidos de um cliente especifico
  async listAllClientRequests(req, res) {
    try {
      const id_cliente = req.clientId.id;

      const requests = await Request.find({
        id_cliente,
      }).populate(["produtos", "id_empresa"]);

      const count = requests.length;

      if (count === 0)
        return res.status(404).send({ NOTFOUND: "Nenhum pedido encontrado" });

      return res.status(200).send({ TOTAL: count, requests });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  //### Lista todos os pedidos de um cliente especifico
  async listAllCompanyRequests(req, res) {
    try {
      const id_empresa = req.userPayload.empresa;

      const requests = await Request.find({
        id_empresa,
      }).populate(["produtos", "id_cliente"]);

      const count = requests.length;

      if (count === 0)
        return res.status(404).send({ NOTFOUND: "Nenhum pedido encontrado" });

      return res.status(200).send({ TOTAL: count, requests });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  //### Possibilia ao cliente alterar dados de um pedido
  async updateClientRequest(req, res) {
    const _id = req.params.pedidoId;

    try {
      const updateRequest = await Request.findByIdAndUpdate(
        _id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(200).send({ updateRequest });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  //### Possibilia a empresa alterar dados de um pedido
  async updateCompanyRequest(req, res) {
    const _id = req.params.pedidoId;

    try {
      const updateRequest = await Request.findByIdAndUpdate(
        _id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(200).send({ updateRequest });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
