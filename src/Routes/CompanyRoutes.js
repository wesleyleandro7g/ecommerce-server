const routes = require("express").Router;
const router = routes();

const CompanyController = require("../controllers/CompanyController");

const CompanyMidlleare = require("../middlewares/Admin");

router.post("/create", CompanyController.create);
router.get("/list", CompanyController.list);
router.get("/list/:empresaId", CompanyController.show);
router.put("/update", CompanyMidlleare, CompanyController.update);
router.delete("/delete", CompanyMidlleare, CompanyController.delete);

module.exports = router;
