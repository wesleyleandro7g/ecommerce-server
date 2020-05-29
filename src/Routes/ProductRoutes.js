const routes = require("express").Router;
const router = routes();

const ProductController = require("../controllers/ProductController");

router.post("/:companyId", ProductController.create);
router.get("/:companyId/produtos", ProductController.list);
router.get("/:companyId/:productId", ProductController.show);
router.put("/:companyId", ProductController.update);
router.delete("/:companyId", ProductController.delete);

module.exports = router;
