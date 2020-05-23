const db = require("../database");

const ProductModel = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  promotional_price: {
    type: String,
    required: true,
  },
  promotion_enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  promotion_start_date: {
    type: Date,
  },
  promotion_end_date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedToCompany: {
    type: db.Schema.Types.ObjectId,
    required: true,
  },
});

const Product = db.model("Product", ProductModel);

module.exports = Product;
