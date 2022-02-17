const db = require("../db/connection");

exports.fetchCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 400, msg: "BAD REQUEST" });
      }
      return rows;
    });
};
