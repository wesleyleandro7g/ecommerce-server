const router = require("express").Router;

const app = router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");

//### Rotas para autenticar usuários
app.post("/authentication", AuthController.authenticate);

//### Rotas para operações com empresas
app.post("/company", CompanyController.create);
app.get("/company", CompanyController.list);
app.get("/company/:companyId", CompanyController.show);
app.put("/company/:companyId", CompanyController.update);
app.delete("/company/:companyId", CompanyController.delete);

//### Rotas para operações com usuários
app.post("/:empresaId/register", UserController.create);
app.get("/:empresaId/user", UserController.list);
app.get("/:empresaId/user/:userId", UserController.show);
app.put("/:empresaId/user/:userId", UserController.update);
app.delete("/:empresaId/user/:userId", UserController.delete);

//### Rotas para operações com produtos
app.post("/:companyId/products/", ProductController.create);
app.get("/:companyId/products/", ProductController.list);
app.get("/:productId", ProductController.show);
app.put("/:productId", ProductController.update);
app.delete("/:productId", ProductController.delete);

module.exports = app;
