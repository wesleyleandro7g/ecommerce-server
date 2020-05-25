const router = require("express").Router;

const app = router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");

//### Rotas para autenticar usuários
app.post("/authentication", AuthController.authenticate);

//### Rotas para operações com usuários
app.post("/user/register", UserController.create);
app.get("/user", UserController.list);

//### Rotas para operações com empresas
app.post("/company", CompanyController.create);
app.put("/company/:companyId", CompanyController.update);
app.get("/company", CompanyController.list);
app.get("/company/:companyId", CompanyController.show);
app.delete("/company/:companyId", CompanyController.delete);

//### Rotas para operações com produtos
app.post("/:companyId/products/", ProductController.create);
app.get("/:companyId/products/", ProductController.list);
app.get("/:productId", ProductController.show);
app.put("/:productId", ProductController.update);
app.delete("/:productId", ProductController.delete);

module.exports = app;
