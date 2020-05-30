const db = require("../database");
const bcrypt = require("bcryptjs");

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
  senha: {
    type: String,
    required: true,
    select: false,
  },
  data_cadastro: {
    type: Date,
    default: Date.now,
  },
});

EmpresaSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const Empresa = db.model("Empresa", EmpresaSchema);

module.exports = Empresa;
