var express = require('express');
var router = express.Router();


const mongoose = require('mongoose');//操作mongoDB数据库的中间件
const jwt = require('jsonwebtoken');


var path = require("path")
var fs= require("fs")


var multer = require('multer');//接收图片
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
})
var upload = multer({ storage: storage })



var sevendays = 604800
var normaltime = 86400


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//登陆

//添加文章
router.post('/artcleadd',  upload.single('pic'),function(req, res, next) {

//mongodb连接
    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');

    let {title,date,describe,article,kind} = req.body
    let author="watterson"

    var arr = req.file.path.split('/')

    // let pic_pach = req.file.path

    let pic_pach = "http://111.229.111.185"+"/"+arr[arr.length-2]+"/"+arr[arr.length-1]

    console.log(req.body);

    articles.create({
        title,
        author,
        date,
        pic:pic_pach,
        kind,
        describe,
        article
    }).then((doc) => {
        console.log(doc);

        // res.redirect('https://www.baidu.com')//成功创建。重定向首页
    })
} )

//查询文章列表
router.get('/articleget', function(req, res, next) {

    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');



    articles.find().then(
       result=>{
           console.log(result);
           res.json(result)
       }
   )


});






module.exports = router;
