const db = require("../database");

const SectionSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Section = db.model("Section", SectionSchema);

module.exports = Section;
