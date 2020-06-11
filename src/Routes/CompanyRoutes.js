const routes = require("express").Router;
const multer = require("multer");

const router = routes();

const multerConfig = require("../config/Multer");

const CompanyController = require("../controllers/CompanyController");

const UserMidllweare = require("../middlewares/Usuarios");

router.post(
  "/create",
  multer(multerConfig).single("file"),
  CompanyController.create
);
router.get("/list", CompanyController.list);
router.get("/list/:empresaId", CompanyController.show);
router.put("/update", UserMidllweare, CompanyController.update);
router.delete("/delete", UserMidllweare, CompanyController.delete);

module.exports = router;
