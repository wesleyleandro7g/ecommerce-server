const routes = require("express").Router;
const multer = require("multer");

const router = routes();

const multerConfig = require("../config/Multer");

const ProductController = require("../controllers/ProductController");

const UserMidlleware = require("../middlewares/Usuarios");

router.post(
  "/create",
  multer(multerConfig).single("file"),
  UserMidlleware,
  ProductController.create
);
router.get("/list/:companyId", ProductController.list);
router.get("/show/:productId", ProductController.show);
router.put("/update/:productId", UserMidlleware, ProductController.update);
router.delete("/delete/:productId", UserMidlleware, ProductController.delete);

module.exports = router;
