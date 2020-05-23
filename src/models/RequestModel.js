const db = require("../database");

const RequestSchema = new db.Schema({
  value: {
    type: String,
    required: true,
  },
  products: [
    {
      type: db.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  assignedToCompany: {
    type: db.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  assignedToClient: {
    type: db.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Request = db.model("Request", RequestSchema);

module.exports = Request;
