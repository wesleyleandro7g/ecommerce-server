const routes = require("express").Router;
const router = routes();

const RequestController = require("../controllers/RequestController");

const UserMidlleware = require("../middlewares/Usuarios");
const ClientMilleware = require("../middlewares/Clientes");

router.post("/create/:empresaId", ClientMilleware, RequestController.create);
router.get("/list/cliente", RequestController.listAllClientRequests);
router.get("/list/empresa", RequestController.listAllCompanyRequests);
router.put("/update/cliente/:pedidoId", RequestController.updateClientRequest);
router.put("/update/empresa/:pedidoId", RequestController.updateCompanyRequest);

module.exports = router;
