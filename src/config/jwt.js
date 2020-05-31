const jwt = require("jsonwebtoken");

module.exports = {
  async sign(payload, auth, expiresIn) {
    console.log({ PAYLOAD: payload });
    const token = await jwt.sign({ payload }, auth, {
      expiresIn: expiresIn,
    });

    return token;
  },
};
