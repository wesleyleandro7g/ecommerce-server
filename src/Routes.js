const express = require("express");

const app = express();
app.use(express.json());

const AuthRoutes = require("./Routes/AuthRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const ClientRoutes = require("./Routes/ClientRoutes");
const RequestRoutes = require("./Routes/RequestRoutes");

app.use("/login", AuthRoutes);
app.use("/empresas", CompanyRoutes);
app.use("/usuarios", UserRoutes);
app.use("/produtos", ProductRoutes);
app.use("/clientes", ClientRoutes);
app.use("/pedidos", RequestRoutes);

module.exports = app;
