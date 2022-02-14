const { fetchTopics, fetchArticleById } = require("../models/app.models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleById(id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
