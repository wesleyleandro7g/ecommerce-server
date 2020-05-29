const routes = require("express").Router;
const router = routes();

const ClientController = require("../controllers/ClientController");

router.post("/", ClientController.create);
router.get("/:clientId", ClientController.show);
router.put("/:clientId", ClientController.update);
router.delete("/:clientId", ClientController.delete);

module.exports = router;
