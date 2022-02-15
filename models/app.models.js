const db = require("../db/connection");

exports.fetchTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);
  return result.rows;
};

exports.fetchArticleById = async (id) => {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [id]
  );
  if (result.rows.length < 1) {
    return Promise.reject({ status: 400, msg: "BAD REQUEST" });
  }
  return result.rows;
};

exports.updateArticleById = (id, update) => {
  const num = update.inc_votes;

  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [num, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
