const jwt = require("jsonwebtoken");

module.exports = {
  async sign(payload, auth) {
    const token = await jwt.sign({ payload }, auth, {
      expiresIn: 84000,
    });

    return token;
  },
};
