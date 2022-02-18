const { removeCommentById,doesCommentExist } = require("../models/comments.models")

exports.deleteCommentById = (req,res,next)=>{
    const id = req.params.comment_id
    Promise.all([doesCommentExist(id),removeCommentById(id)])
    .then((comment)=>{
        res.status(204).send({msg: comment})
    }).catch(next)
}