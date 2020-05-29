const routes = require("express").Router;
const router = routes();

const CompanyController = require("../controllers/CompanyController");

router.post("/", CompanyController.create);
router.get("/", CompanyController.list);
router.get("/:empresaId", CompanyController.show);
router.put("/:empresaId", CompanyController.update);
router.delete("/:empresaId", CompanyController.delete);

module.exports = router;
