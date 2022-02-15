const {
  fetchTopics,
  fetchArticleById,
  updateArticleById,
} = require("../models/app.models");

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

exports.patchArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  updateArticleById(id,req.body)
    .then((articles) => {
      res.status(201).send({ articles });
    })
    .catch(next);
};
