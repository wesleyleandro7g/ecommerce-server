const db = require("../database");

const ProductSchema = new db.Schema({
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
    required: false,
  },
  promotion_enabled: {
    type: Boolean,
    required: false,
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
    ref: "Company",
    required: true,
  },
});

const Product = db.model("Product", ProductSchema);

module.exports = Product;
