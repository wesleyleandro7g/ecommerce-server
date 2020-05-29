const routes = require("express").Router;
const router = routes();

const UserController = require("../controllers/UserController");

router.post("/:empresaId/user", UserController.create);
router.get("/:empresaId", UserController.list);
router.get("/:empresaId/:userId", UserController.show);
router.put("/:empresaId/:userId", UserController.update);
router.delete("/:empresaId/:userId", UserController.delete);

module.exports = router;
