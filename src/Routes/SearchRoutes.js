const routes = require("express").Router;
const router = routes();

const SearchController = require("../controllers/SearchController");

router.post("/empresas", SearchController.companysSearch);
router.post("/produtos", SearchController.productsSearch);

module.exports = router;
