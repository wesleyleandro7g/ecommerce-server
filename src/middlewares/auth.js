const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provider" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({ error: "Token error" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: "Token malformated" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: err });
    }

    req.userId = decoded.payload;

    return next();
  });
};
