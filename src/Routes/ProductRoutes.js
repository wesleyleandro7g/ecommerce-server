const routes = require("express").Router;
const router = routes();

const ProductController = require("../controllers/ProductController");

const CompanyMidlleware = require("../middlewares/Admin");
const UserMidlleware = require("../middlewares/Usuarios");

router.post("/create", CompanyMidlleware, ProductController.create);
router.post("/create/:companyId", UserMidlleware, ProductController.create);
router.get("/list/:companyId", ProductController.list);
router.get("/show/:productId", ProductController.show);
router.put(
  "/empresa/update/:productId",
  CompanyMidlleware,
  ProductController.update
);
router.put(
  "/usuario/update/:productId",
  CompanyMidlleware,
  ProductController.update
);
router.delete(
  "/delete/:productId",
  CompanyMidlleware,
  ProductController.delete
);

module.exports = router;
