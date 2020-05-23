const db = require("../database");

const CompanySchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: String,
    required: true,
  },
});

const Company = db.model("Company", CompanySchema);

module.exports = Company;
