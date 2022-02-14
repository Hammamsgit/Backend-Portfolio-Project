const db = require("../db/connection");

exports.fetchTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);
  return result.rows;
};

exports.fetchArticleById = async (id) => {

  
  const result = await db.query(`SELECT * FROM articles WHERE article_id = $1;`,[id]);
  return result.rows
};

