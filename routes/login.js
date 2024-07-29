const express = require('express')
const router = express.Router()

router.get('/login',(req,res)=>{
    res.send('Login successful, welcome to dashboard')
})

module.exports=router