const routes = require("express").Router;
const router = routes();

const VerifyTokenController = require("../controllers/VerifyTokenController");

router.post("/usuario", VerifyTokenController.verifyUserToken);
router.post("/cliente", VerifyTokenController.verifyUserToken);

module.exports = router;
