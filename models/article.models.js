const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = async (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 400, msg: "BAD REQUEST" });
      }
      return rows;
    });
};

exports.updateArticleById = (id, update) => {
  const num = update.inc_votes;

  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [num, id]
    )
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};

exports.fetchArticles = () => {
  return db
    .query("SELECT * FROM articles ORDER BY created_at desc;")
    .then(({ rows }) => {
      return rows;
    });
};
