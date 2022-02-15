const express = require("express");
const { getTopics, getArticlesById, patchArticlesById } = require("./controllers/app.controllers");
const { handlesCustomErrors, handlesPsqlErrors, handleServerErrors } = require("./controllers/error.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);

app.patch("/api/articles/:article_id", patchArticlesById);


app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use(handlesPsqlErrors);
app.use(handlesCustomErrors);
app.use(handleServerErrors);

module.exports = app;
