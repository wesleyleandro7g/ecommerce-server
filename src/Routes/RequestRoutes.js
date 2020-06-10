const routes = require("express").Router;
const router = routes();

const RequestController = require("../controllers/RequestController");

const UserMidlleware = require("../middlewares/Usuarios");
const ClientMilleware = require("../middlewares/Clientes");

router.post("/create/:empresaId", ClientMilleware, RequestController.create);
router.put(
  "/cliente/update/:pedidoId",
  ClientMilleware,
  RequestController.updateClientRequest
);
router.get(
  "/cliente/list",
  ClientMilleware,
  RequestController.listAllClientRequests
);

router.put(
  "/empresa/update/:pedidoId",
  UserMidlleware,
  RequestController.updateCompanyRequest
);
router.get(
  "/empresa/list",
  UserMidlleware,
  RequestController.listAllCompanyRequests
);

module.exports = router;
