const db = require("../database");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  telefone_contato: {
    type: String,
    required: false,
  },
  administrador: {
    type: Boolean,
    required: true,
    default: false,
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
  id_empresa: {
    type: db.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

UsuarioSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const Usuario = db.model("Usuario", UsuarioSchema);

module.exports = Usuario;
