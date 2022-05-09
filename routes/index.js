const express = require('express')
const router = express.Router()

const productos = require('../database.js')


router.get('/',(req,res)=>{
    res.render('main',{
        productos: productos
    })
})

module.exports = router