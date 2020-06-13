const jwt = require("jsonwebtoken");

module.exports = {
  async generate(payload, auth, expiresIn) {
    const token = await jwt.sign({ payload }, auth, {
      expiresIn: expiresIn,
    });

    return token;
  },

  async verify(res, authHeader, hash) {
    if (!authHeader) return res.status(401).send(false);

    const parts = authHeader.split(" ");

    if (!parts.length === 2) return res.status(401).send(false);

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) return res.status(401).send(false);

    const authPayload = jwt.verify(token, hash, (err, decoded) => {
      if (err) {
        return res.status(401).send(false);
      }

      return decoded.payload;
    });

    return authPayload;
  },
};
