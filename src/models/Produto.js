const db = require("../database");

const ProdutoSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: String,
    required: true,
  },
  preco_promocional: {
    type: String,
    required: false,
  },
  preco_promocional_ativo: {
    type: Boolean,
    required: false,
    default: false,
  },
  data_inicio_promocao: {
    type: Date,
  },
  data_fim_promocao: {
    type: Date,
  },
  id_empresa: {
    type: db.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  data_cadastro: {
    type: Date,
    default: Date.now,
  },
});

const Produto = db.model("Produto", ProdutoSchema);

module.exports = Produto;
