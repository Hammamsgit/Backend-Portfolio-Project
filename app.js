const express = require("express");
const { getTopics } = require("./controllers/app.controllers");
const { handlesCustomErrors, handlesPsqlErrors, handleServerErrors } = require("./controllers/error.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
// app.use(handlesCustomErrors);
// app.use(handlesPsqlErrors);
// app.use(handleServerErrors);

module.exports = app;
