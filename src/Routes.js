const router = require("express").Router;

const app = router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");

const authMiddlewares = require("./middlewares/AuthenticateUsers");

//### Rotas para autenticar usuários
app.post("/:empresaId/authentication", AuthController.authenticate);

//###_### Rotas que não precisam de autenticação
//### Rotas para operações com empresas
app.post("/empresa", CompanyController.create);
app.get("/empresa", CompanyController.list);
app.get("/empresa/:empresaId", CompanyController.show);

//### Rotas para operações com produtos
app.get("/:companyId/products/", ProductController.list);
app.get("/:companyId/:productId", ProductController.show);

//### Middleware de autenticação
app.use(authMiddlewares);

//###_### Rotas que precisam de autenticação
//### Rotas para operações com empresas
app.put("/empresa/:empresaId", CompanyController.update);
app.delete("/empresa/:empresaId", CompanyController.delete);

//### Rotas para operações com usuários
app.post("/:empresaId/user", UserController.create);
app.get("/:empresaId/users", UserController.list);
app.get("/:empresaId/:userId", UserController.show);
app.put("/:empresaId/:userId", UserController.update);
app.delete("/:empresaId/:userId", UserController.delete);

//### Rotas para operações com produtos
app.post("/:companyId/products/", ProductController.create);
app.put("/:productId", ProductController.update);
app.delete("/:productId", ProductController.delete);

module.exports = app;
