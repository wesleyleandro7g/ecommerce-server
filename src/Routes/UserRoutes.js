const routes = require("express").Router;
const router = routes();

const UserController = require("../controllers/UserController");

const UserMidlleware = require("../middlewares/Usuarios");
const CompanyMidlleware = require("../middlewares/Admin");

router.post("/create", CompanyMidlleware, UserController.create);
router.get("/list", CompanyMidlleware, UserController.list);
router.get(
  "/:empresaId/:userId",
  CompanyMidlleware || UserMidlleware,
  UserController.show
);
router.put("/update", UserMidlleware, UserController.update);
router.delete("/delete/:userId", CompanyMidlleware, UserController.delete);

module.exports = router;
