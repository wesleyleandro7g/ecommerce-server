const db = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
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

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = db.model("User", UserSchema);

module.exports = User;
