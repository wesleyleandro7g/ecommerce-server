const router = require("express").Router;

const app = router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");
const ClientController = require("./controllers/ClientController");

const userMiddlewares = require("./middlewares/AuthenticateUsers");
const clientMiddleware = require("./middlewares/AuthenticateClients");

//### Rotas para autenticar usuários
app.post("/empresa/:empresaId/authentication", AuthController.userAuthenticate);
app.post(
  "/cliente/:clientId/authentication",
  AuthController.clientAuthenticate
);

//###_### Rotas que não precisam de autenticação
//### Rotas para operações com empresas
app.post("/empresa", CompanyController.create);
app.get("/empresa", CompanyController.list);
app.get("/empresa/:empresaId", CompanyController.show);

//### Rotas para operações com produtos
app.get("/produtos/:companyId/products", ProductController.list);
app.get("/produtos/:companyId/:productId", ProductController.show);

//### Middleware de autenticação de clientes
app.use(clientMiddleware);

//### Rotas para operações com clientes
app.post("/cliente", ClientController.create);
app.get("/cliente/:clientId", ClientController.show);

//### Middleware de autenticação de usuários
app.use(userMiddlewares);

//###_### Rotas que precisam de autenticação
//### Rotas para operações com empresas
app.put("/empresa/:empresaId", CompanyController.update);
app.delete("/empresa/:empresaId", CompanyController.delete);

//### Rotas para operações com usuários
app.post("/usuarios/:empresaId/user", UserController.create);
app.get("/usuarios/:empresaId", UserController.list);
app.get("/usuarios/:empresaId/:userId", UserController.show);
app.put("/usuarios/:empresaId/:userId", UserController.update);
app.delete("/usuarios/:empresaId/:userId", UserController.delete);

//### Rotas para operações com produtos
app.post("/produtos/:companyId", ProductController.create);
app.put("/produtos/:companyId", ProductController.update);
app.delete("/produtos/:companyId", ProductController.delete);

module.exports = app;
