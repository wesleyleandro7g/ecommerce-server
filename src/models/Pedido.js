const db = require("../database");

const PedidoSchema = new db.Schema({
  valor_total: {
    type: String,
    required: true,
  },
  produtos: [
    {
      type: db.Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
    },
  ],
  id_empresa: {
    type: db.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  id_cliente: {
    type: db.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  data_pedido: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = db.model("Pedido", PedidoSchema);

module.exports = Pedido;
