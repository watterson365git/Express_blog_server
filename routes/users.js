var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
var path = require('path');

//
// mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true,  useUnifiedTopology: true})
//     .then(()=>{
//       console.log('数据库连接成功');})
//     .catch(err=>{
//       console.log(err);
//     });
//
// const users = mongoose.model('users',new mongoose.Schema({
//   user_name:{
//       type:String,
//       unique:true,
//       required:true,
//       maxlength:15,
//       minlength:3,
//
//   },
//   passwords:{
//       type:String,
//       required:true,
//       maxlength:15,
//       minlength:6,
//   },
//   email:String
//
// }));
//
//
//
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.post('/registered', function(req, res, next) {
//
//   users.find({user_name:req.body.name}).then(result=>{
//       console.log(result);
//
//
//       if(result.length!==0){
//
//         res.sendFile(path.join(__dirname, '../public/用户名已存在.html'))
//
//       }else {
//           users.create({
//               user_name:req.body.name,
//               passwords:req.body.passwd,
//               email:req.body.email
//           }).then((doc)=>{
//               console.log(doc);})
//               .catch(err=>{
//                   console.log(err);
//               })
//       }
//   })
// });
//
//
// router.post('/login', function(req, res, next) {
// if(req.body.name.trim().length===0 ||req.body.passwd.trim().length===0){
//  return res.sendFile(path.join(__dirname, '../public/登陆用户名或密码格式错误.html'))
// }else{
//     //查数据库
//     users.find({user_name:req.body.name.trim()})
//     // 1.用户名是否存在
//         .then((result)=>{
//             if(result.length===0){
//                 console.log('该用户不存在');
//                 return res.sendFile(path.join(__dirname, '../public/用户名不存在.html'))
//             }
//             // 2.密码是否匹配
//             else if(result[0].passwords===req.body.passwd.trim()){
//                 console.log('用户存在且密码正确');
//                 req.session.user_name = req.body.name.trim();
//                 //重定向到首页
//                 res.json({name:'zhuxf'})
//                 // res.redirect('/')
//                 //要把req.session.user_name传到客户端（显示用户名）
//             }
//             else{
//                 console.log('密码不正确');
//                 return res.sendFile(path.join(__dirname, '../public/密码不正确.html'))
//             }
//
//         })
//
//
//
//
//
//
// }
//
//
//
//
//
// });
module.exports = router;
