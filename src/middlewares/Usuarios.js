require("dotenv").config();
const jwt = require("../config/JWT");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const decoded = await jwt.verify(res, authHeader, process.env.AUTH_USER);

  req.userPayload = decoded;

  return next();
};
