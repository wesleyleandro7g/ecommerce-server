const routes = require("express").Router;
const router = routes();

const AuthController = require("../controllers/AuthController");

router.post("/:empresaId", AuthController.userAuthenticate);
router.post("/:clientId", AuthController.clientAuthenticate);

module.exports = router;
