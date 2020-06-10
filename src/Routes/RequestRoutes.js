const routes = require("express").Router;
const router = routes();

const RequestController = require("../controllers/RequestController");

router.post("/:empresaId/:clienteId", RequestController.create);
router.get("/cliente/:clienteId", RequestController.listAllClientRequests);
router.get("/empresa/:empresaId", RequestController.listAllCompanyRequests);
router.put("/cliente/:pedidoId", RequestController.updateClientRequest);
router.put("/empresa/:pedidoId", RequestController.updateCompanyRequest);

module.exports = router;
