require("dotenv").config();
const jwtVerify = require("../config/jwtVerify");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const decoded = await jwtVerify(res, authHeader, process.env.AUTH_USER);

  req.userPayload = decoded;

  return next();
};
