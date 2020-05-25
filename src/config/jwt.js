const jwt = require("jsonwebtoken");

const authConfig = require("./authConfig");

module.exports = {
  async sign(payload) {
    const token = await jwt.sign({ payload }, authConfig.secret, {
      expiresIn: 84000,
    });

    return token;
  },
};
