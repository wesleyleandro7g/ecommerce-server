const routes = require("express").Router;
const router = routes();

const UserController = require("../controllers/UserController");

const UserMidlleware = require("../middlewares/Usuarios");

router.post("/create", UserMidlleware, UserController.create);
router.get("/list", UserMidlleware, UserController.list);
router.get("/:empresaId/:userId", UserMidlleware, UserController.show);
router.put("/update", UserMidlleware, UserController.update);
router.delete("/delete/:userId", UserMidlleware, UserController.delete);

module.exports = router;
