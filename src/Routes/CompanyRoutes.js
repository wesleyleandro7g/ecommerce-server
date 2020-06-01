const routes = require("express").Router;
const router = routes();

const CompanyController = require("../controllers/CompanyController");

const UserMidllweare = require("../middlewares/Usuarios");

router.post("/create", CompanyController.create);
router.get("/list", CompanyController.list);
router.get("/list/:empresaId", CompanyController.show);
router.put("/update", UserMidllweare, CompanyController.update);
router.delete("/delete", UserMidllweare, CompanyController.delete);

module.exports = router;
