const express = require("express");
const {
  getTopics,
  getArticlesById,
  patchArticleById,
  getArticles,
  getArticleCommentsById,
  postCommentByArticleId,
} = require("./controllers/articles.controller");
const {
  handlesCustomErrors,
  handlesPsqlErrors,
  handleServerErrors,
} = require("./controllers/error.controllers");
const { getUsers } = require("./controllers/users.controller");

const app = express();
app.use(express.json());
/////////////////////////////TOPICS///////////////////////////////////////
app.get("/api/topics", getTopics);
/////////////////////////////ARTICLES/////////////////////////////////////
app.get("/api/articles/:article_id/comments", getArticleCommentsById);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getArticles);
app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments",postCommentByArticleId)
//////////////////////////////USERS/////////////////////////////////////
app.get("/api/users", getUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use(handlesPsqlErrors);
app.use(handlesCustomErrors);
app.use(handleServerErrors);

module.exports = app;
