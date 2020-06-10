const routes = require("express").Router;
const router = routes();

const ClientController = require("../controllers/ClientController");

const ClientMidlleware = require("../middlewares/Clientes");

router.post("/create", ClientController.create);
router.get("/show", ClientMidlleware, ClientController.show);
router.put("/update", ClientMidlleware, ClientController.update);
router.delete("/delete", ClientMidlleware, ClientController.delete);

module.exports = router;
