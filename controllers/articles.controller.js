const {
  fetchTopics,
  fetchArticleById,
  updateArticleById,
  fetchArticles,
} = require("../models/article.models");
const { fetchCommentsByArticleId } = require("../models/comments.models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  Promise.all([fetchArticleById(id), fetchCommentsByArticleId(id)])
    .then((result) => {
      const articles = result[0];
      const comments = result[1];
      articles[0].comment_count = comments.length;
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  updateArticleById(id, req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
