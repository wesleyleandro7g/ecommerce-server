require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: "Token não informado" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({ error: "Erro no Token" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: "Token mau formado" });

  jwt.verify(token, process.env.AUTH_COMPANY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token inválido" });
    }

    req.companyId = decoded.payload.id;

    return next();
  });
};
