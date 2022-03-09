const {
  fetchTopics,
  fetchArticleById,
  updateArticleById,
  fetchArticles,
} = require("../models/article.models");
const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/comments.models");

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
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const id = req.params.article_id;
  updateArticleById(id, req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const{sort_by,order,topic} = req.query;
  fetchArticles(sort_by,order,topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleCommentsById = (req, res, next) => {
  const id = req.params.article_id;
  fetchCommentsByArticleId(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  const comment = req.body;

  insertCommentByArticleId(id, comment)
    .then((comment) => {
      
      res.status(201).send({ comment });
    })
    .catch(next);
};
