var express = require('express');
var router = express.Router();


const mongoose = require('mongoose');//操作mongoDB数据库的中间件
const jwt = require('jsonwebtoken');
// const Redis = require("ioredis");
// var redis = new Redis();

const Redis = require('redis');


var sevendays = 604800
var normaltime = 86400


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//登陆
router.post('/login', function(req, res, next)  {
    const redis = Redis.createClient();
    redis.auth(741123);


    //mongodb连接
    const connect_mongo = require('../database/config');
    connect_mongo();
    const users = require('../database/model');

  let time = 0
  let { email, password,check } = req.body


//判断是否勾选7天免登录
    if(check==="on"){
    time = sevendays
    console.log(time);
  }else{
    time=normaltime
    console.log(time);
  }


    users.findOne({
        email
    }, function(err, result) {
        if (err) throw err;

        if (result===null) {

            res.json({ success: false, alert: '该用户未注册' ,show:true});
        } else if (email) {

            if (result.password !== req.body.password) {
                res.json({success: false, alert: '用户名或密码错误' ,show:true});
            }else{
                //成功登陆

                  //生成token
                  const token = jwt.sign({
                        email,password
                      },'user_pass_xxx' //随便一点内容，撒盐：加密的时候混淆
                      ,{
                        expiresIn: time //xx秒到期时间
                      });

                  //redis存储
                  redis.set(email,token)
                    // console.log(token);
                    redis.expire(email,time);


                // 把token存放在本地
                    res.cookie("state",token,{maxAge: time*1000, httpOnly: true});
                //HttpOnly 默认 false 不允许 客户端脚本访问

                  // ctx.cookies.set(
                  //     'state',
                  //     token,
                  //     {
                  //       domain: 'localhost', // 写cookie所在的域名
                  //       path: '/', // 写cookie所在的路径
                  //       maxAge: time*1000, // cookie有效时长
                  //       expires: new Date('2024-07-07'), // cookie失效时间
                  //       httpOnly: false, // 是否只用于http请求中获取
                  //       overwrite: false // 是否允许重写
                  //     }
                  //
                // res.redirect("http://localhost:3000/")
                res.json({success: true, alert: '' ,show:false});
                }
            }
    });

})



//注册
router.post('/addusers', function (req,res, next) {
    //mongodb连接
    const connect_mongo = require('../database/config');
    connect_mongo();
    const users = require('../database/model');

    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;

    if (password === password2) {
       users.create({
            email,
            password,

        }).then((doc) => {
            console.log(doc);

            res.redirect('https://www.baidu.com')//成功创建。重定向首页
           // res.redirect('http://localhost:8080/login')//成功创建。重定向登陆页面
       }).catch(err => {
            console.log(err.code);
            res.json = {'alert': '用户名已存在','show':'true'}//创建失败.用户名重复。发送json
           // res.redirect('http://localhost:8080/login')//成功创建。重定向首页
        });
    } else {
            res.json= {'alert': '您关闭了浏览器JavaScript且两次密码不一样','show':'true'}//创建失败。发送json//创建失败。两次密码不一样。重定向register
    }
})


router.get('/logout', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    const redis = Redis.createClient();
    redis.auth(741123);

    console.log(req.query.email);

    redis.del(req.query.email,function (err,doc) {
        if(err){
            console.log(err);
        }else{

            res.json({success: true});
        }
    })


});





module.exports = router;
