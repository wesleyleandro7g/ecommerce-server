const router = require("express").Router;

const app = router();

const CompanyController = require("./controllers/CompanyController");

app.post("/company", CompanyController.create);
app.put("/company/:companyId", CompanyController.update);
app.get("/company", CompanyController.list);
app.get("/company/:companyId", CompanyController.show);
app.delete("/company/:companyId", CompanyController.delete);

module.exports = app;
