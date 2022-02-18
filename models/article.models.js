const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};
exports.doesTopicExist = (slug, next) => {
  return db
    .query("SELECT * FROM topics WHERE slug = $1;", [slug])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `Article not found` });
      } else {
        return true;
      }
    })
    .catch(next);
};
exports.doesArticleExist = (id, next) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `Article not found` });
      } else {
        return rows;
      }
    })
    .catch(next);
};
exports.fetchArticleById = (id) => {
  const newQuery = `SELECT articles.*, COUNT(comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id WHERE articles.article_id = $1 GROUP BY comments.article_id, articles.author, title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes;`;
  return db.query(newQuery, [id]).then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({ status: 400, msg: "BAD REQUEST" });
    }
    return rows[0];
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
exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  // console.log(topic);
  const queryValues = []
  let validColumns = [
    "title",
    "topic",
    "article_id",
    "author",
    "body",
    "created_at",
    "votes",
  ];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort query' });
  }

  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }
  let topicQuery = "";

  if (topic != undefined) {
    topicQuery = `WHERE articles.topic = $1`;
    queryValues.push(topic)
  }

  return db
    .query(
      `SELECT articles.*, COUNT(comment_id)::INT AS comment_count FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id ${topicQuery} GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`,queryValues)
    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 404, msg: `Topic not found` });
      }
      return rows;
    });
};
