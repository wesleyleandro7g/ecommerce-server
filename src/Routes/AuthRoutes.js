const routes = require("express").Router;
const router = routes();

const AuthController = require("../controllers/AuthController");

router.post("/usuario/:empresaId", AuthController.userAuthenticate);
router.post("/cliente/:clientId", AuthController.clientAuthenticate);

module.exports = router;
