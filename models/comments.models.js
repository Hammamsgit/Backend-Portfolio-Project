const format = require("pg-format");
const db = require("../db/connection");
const { doesArticleExist } = require("./article.models");

exports.fetchCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows;
    });
};

exports.insertCommentByArticleId = (id, newComment) => {

  const { username, body } = newComment;

  return doesArticleExist(id).then(() => {
    return db
      .query(
        "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;",
        [username, body, id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  });
};
