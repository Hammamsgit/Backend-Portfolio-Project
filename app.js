const cors = require('cors');
const express = require("express");
const { getApi } = require("./controllers/app.controller");
const {
  getTopics,
  getArticlesById,
  patchArticleById,
  getArticles,
  getArticleCommentsById,
  postCommentByArticleId,
} = require("./controllers/articles.controller");
const { deleteCommentById } = require("./controllers/comments.controllers");
const {
  handlesCustomErrors,
  handlesPsqlErrors,
  handleServerErrors,
} = require("./controllers/error.controllers");
const { getUsers } = require("./controllers/users.controller");


const app = express();
app.use(cors());
app.use(express.json());
app.get("/api",getApi)
/////////////////////////////TOPICS///////////////////////////////////////
app.get("/api/topics", getTopics);
/////////////////////////////ARTICLES/////////////////////////////////////
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getArticleCommentsById);
app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments",postCommentByArticleId)
//////////////////////////////USERS/////////////////////////////////////
app.get("/api/users", getUsers);
/////////////////////////////COMMENTS///////////////////////////////////
app.delete("/api/comments/:comment_id",deleteCommentById)
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use(handlesPsqlErrors);
app.use(handlesCustomErrors);
app.use(handleServerErrors);

module.exports = app;
