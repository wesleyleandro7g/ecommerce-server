const router = require("express").Router;

const app = router();

app.get("/", (req, res) => {
  res.send({ server: "Is running" });
});

module.exports = app;
