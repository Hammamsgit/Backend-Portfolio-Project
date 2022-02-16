exports.handlesCustomErrors = (err,req,res,next)=>{
    if(err.status) res.status(err.status).send({msg: err.msg})
    else next(err);
}

exports.handlesPsqlErrors = (err,req,res,next)=>{
    if(err.code==='22P02') res.status(400).send({msg:"Bad Request"});
    else if (err.code==='23503') res.status(400).send({msg:'invalid request'})
    else if(err.code==='23502') res.status(400).send({msg: 'invalid input'})
    else next(err);
}

exports.handleServerErrors = (err,req,res,next)=>{
    console.log(err)
    res.status(500).send({msg: "SERVER ERROR"})
}