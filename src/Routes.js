const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const AuthRoutes = require("./Routes/AuthRoutes");
const TokenRoutes = require("./Routes/TokenRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const ClientRoutes = require("./Routes/ClientRoutes");
const RequestRoutes = require("./Routes/RequestRoutes");
const SearchRoutes = require("./Routes/SearchRoutes");

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE");
    return res.status(200).send({});
  }

  next();
});

app.use("/login", AuthRoutes);
app.use("/token", TokenRoutes);
app.use("/empresas", CompanyRoutes);
app.use("/usuarios", UserRoutes);
app.use("/produtos", ProductRoutes);
app.use("/clientes", ClientRoutes);
app.use("/pedidos", RequestRoutes);
app.use("/search", SearchRoutes);

app.use((req, res, next) => {
  const error = new Error("Rota não encontrada");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.statusCode || 500)
    .send({ error: { message: error.statusMessage } });
});

module.exports = app;
