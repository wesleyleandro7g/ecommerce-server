const db = require("../database");

const EmpresaSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone_contato: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  },
  imagemURL: {
    type: String,
    required: false,
  },
  data_cadastro: {
    type: Date,
    default: Date.now,
  },
});

const Empresa = db.model("Empresa", EmpresaSchema);

module.exports = Empresa;
