const express = require("express");

const app = express();

const AuthRoutes = require("./Routes/AuthRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const ClientRoutes = require("./Routes/ClientRoutes");

app.use("/login", AuthRoutes);
app.use("/empresas", CompanyRoutes);
app.use("/usuarios", UserRoutes);
app.use("/produtos", ProductRoutes);
app.use("/clientes", ClientRoutes);

module.exports = app;
