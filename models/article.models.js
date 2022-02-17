const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};
// author: expect.any(String),
// title: expect.any(String),
// article_id: expect.any(Number),
// topic: expect.any(String),
// created_at: expect.any(String),
// votes: expect.any(Number),

exports.fetchArticleById = async (id) => {
  return db
    .query(
      `SELECT articles.author, title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, COUNT(comment_id)::INT AS comment_count FROM articles JOIN comments ON comments.article_id=articles.article_id WHERE articles.article_id = $1 GROUP BY comments.article_id, articles.author, title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 400, msg: "BAD REQUEST" });
      }
      return rows;
    });
};

exports.updateArticleById = (id, update) => {
  const num = update.inc_votes;
  if (Object.keys(update).length > 1) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }

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
