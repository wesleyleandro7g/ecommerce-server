const routes = require("express").Router;
const router = routes();

const AuthController = require("../controllers/AuthController");

router.post("/usuario/:empresaId", AuthController.userAuthenticate);
router.post("/cliente", AuthController.clientAuthenticate);

router.post("/refresh/usuario", AuthController.userRefreshToken);
router.post("/refresh/cliente", AuthController.clientRefreshToken);

module.exports = router;
