const express = require('express')
const router =  express.Router()

router.get('/home',(req,res)=>{
    res.send('welcome to home')
})

module.exports=router