var express = require('express');
var router = express.Router();


const mongoose = require('mongoose');//操作mongoDB数据库的中间件
const jwt = require('jsonwebtoken');


var path = require("path")
var fs= require("fs")


var multer = require('multer');//接收图片
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname, '../public/blogs'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.html');
    }
})
var upload = multer({ storage: storage })




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//添加文章
router.post('/htmladd',  upload.single('htmls'),function(req, res, next) {
    //mongodb连接
    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');

    let title = req.body.title;


    console.log(req.body);


    var arr = req.file.path.split('/')

    // let pic_pach = req.file.path

    let article_pach = "http://111.229.111.185"+"/"+arr[arr.length-2]+"/"+arr[arr.length-1]

    console.log(req.body);


    articles.updateOne({title:title},{article:article_pach}).then((doc) => {
        console.log(doc);

        // res.redirect('https://www.baidu.com')//成功创建。重定向首页
    })
} )


module.exports = router;
