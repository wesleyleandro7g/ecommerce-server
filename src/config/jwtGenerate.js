const jwt = require("jsonwebtoken");

module.exports = {
  async sign(payload, auth, expiresIn) {
    const token = await jwt.sign({ payload }, auth, {
      expiresIn: expiresIn,
    });

    return token;
  },
};
