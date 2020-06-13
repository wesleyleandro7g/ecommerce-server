require("dotenv").config();

const jwt = require("../config/JWT");

module.exports = {
  async verifyUserToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      const decoded = await jwt.verify(res, authHeader, process.env.AUTH_USER);

      if (decoded.statusCode === 401) {
        return res.status(401).send(false);
      } else {
        return res.status(200).send(true);
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  async verifyClientToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      const decoded = await jwt.verify(
        res,
        authHeader,
        process.env.AUTH_CLIENT
      );

      if (decoded.statusCode === 401) {
        return res.status(401).send(false);
      } else {
        return res.status(200).send(true);
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
