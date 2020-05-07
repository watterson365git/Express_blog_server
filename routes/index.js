var express = require('express');
var router = express.Router();
var path = require("path")
var fs= require("fs")
const mongoose = require('mongoose');//操作mongoDB数据库的中间件

const jwt = require('jsonwebtoken');

const Redis = require('redis');



// var multer = require('multer');//接收图片
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null,path.join(__dirname, '../public/uploads'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.png');
//     }
// })
// var upload = multer({ storage: storage })






/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, ''))

    //发送静态页面


});

router.get('/iflogin', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");


    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');


//解析cookie
    const redis = Redis.createClient();
    redis.auth(741123);
    //如果存在cookies


    articles.find().then(
        result=>{
            // console.log("page_num"+ result.length  );//总页数


            if(req.cookies.state){
                jwt.verify(req.cookies.state, 'user_pass_xxx', function (err, decoded) {
                    // console.log("cookie-decode:" + decoded); //会输出123，如果过了60秒，则有错误。
                    // console.log("cookie-decode:" + decoded.email); //会输出123，如果过了60秒，则有错误。
                    // console.log("cookie-decode:" + decoded.password); //会输出123，如果过了60秒，则有错误。
                    redis.get(decoded.email, function (err, data) {

                        if(data){
                            jwt.verify(data, 'user_pass_xxx', function (err, decoded2) {
                                // console.log("redis-decode:" + decoded2); //会输出123，如果过了60秒，则有错误。
                                if (decoded.password === decoded2.password && decoded.email === decoded2.email) {
                                    res.json(
                                        {
                                            email: decoded2.email,
                                            showbtn: true,
                                            page_num: Math.ceil(result.length/10)
                                        }
                                    )
                                } else {
                                    res.json({ page_num: Math.ceil(result.length/10)})
                                }
                            })
                        }else{

                            res.json({  page_num: Math.ceil(result.length/10)})
                        }
                    })
                })
            } else{
                res.json({  page_num: Math.ceil(result.length/10)})
            }

        }

    )







})


router.get('/articleget', function(req, res, next) {

    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');

    // articles.find().limit(3).skip(3*parseInt(req.query.pagecount)).then(
    //     result=>{
    //         console.log(result);
    //         res.json(result)
    //     }
    // )
    // console.log(typeof (Boolean(req.query.limit)));
    // console.log(req.query.limit);
    // console.log(req.query.pagecount);
    if(Boolean(req.query.limit)===true){

    articles.find().limit(10).skip(10*parseInt(req.query.pagecount)).then(
        result=>{
            // console.log(result);
            res.json(result)
        }
    )

}else{

    articles.find().skip(10*parseInt(req.query.pagecount)).then(
        result=>{
            // console.log(result);
            res.json(result)
        }
    )


}



    //
    // articles.find().limit(parseInt(req.query.pagecount)).then(
    //     result=>{
    //         console.log(result);
    //         res.json(result)
    //     }
    // )


});


router.get('/photo/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.sendFile(path.join(__dirname, '../public/photo/photo.html'))

});




router.get('/flop', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.sendFile(path.join(__dirname, '../public/flop/index.html'))


});



router.get('/visiable', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.sendFile(path.join(__dirname, '../public/visiable/index.html'))

});


router.get('/choose', function(req, res, next) {

    const connect_mongo = require('../database/config.js');
    connect_mongo();
    const articles = require('../database/model_article');
    // console.log(req.query.choose);
    articles.find({kind:req.query.choose}).then(
            result=>{
                // console.log(result);
                res.json(result)
            }
        )

});




module.exports = router;
