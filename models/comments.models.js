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
  if( username && !body) {
    return Promise.reject({ status: 400, msg: 'invalid body'})
}
if( body == {}) {
  return Promise.reject({ status: 400, msg: 'No comment has been made'})
}

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

exports.removeCommentById = (id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1;", [id])
    .then(() => {
      return "Comment deleted";
    });
};
exports.doesCommentExist = (id, next) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `Comment not found` });
      } else {
        return rows;
      }
    })
    .catch(next);
};
