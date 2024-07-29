const ex = require('express')
const Router = ex.Router();

Router.route('/')
    .all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader =('Content-Type','text/plain')
    next()
}
).get((req,res,next)=>{
    res.end('GET REQQQQQQUEST')
}).post((req,res,next)=>{
    res.end('Post rEQQQQUEST')
}).put((req,res,next)=>{
    res.end('PUT RESSSSPOND')
}).patch((req,res,next)=>{
    res.end('PATCH REQUESTtt')
}).delete((req,res,next)=>{
    res.end('DELETE REQUESTTTTTTT')
})


module.exports = Router