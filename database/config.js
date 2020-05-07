//先在app.js中添加mongoose
//然后在users——router中
// const connect_mongo=require('../database/config')
// connect_mongo()
function connect_mongo() {

    const mongoose = require('mongoose');//操作mongoDB数据库的中间件

    mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('数据库连接成功');
        })
        .catch(err => {
            console.log('数据库连接失败' + err);
        });
}

// mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => {
//         console.log('数据库连接成功');
//     })
//     .catch(err => {
//         console.log('数据库连接失败' + err);
//     });


// redis 地址和端口
// const redis = {
//     get host() {
//         return '127.0.0.1'
//     },
//     get port() {
//         return 6379
//     }
// }

// qq邮箱配置
// const smtp = {
//     get host() {
//         return 'smtp.qq.com'
//     },
//     get user() {
//         return '1********@qq.com' // qq邮箱名
//     },
//     get pass() {
//         return '*****************' // qq邮箱授权码
//     },
//     // 生成邮箱验证码
//     get code() {
//         return () => {
//             return Math.random()
//                 .toString(16)
//                 .slice(2, 6)
//                 .toUpperCase()
//         }
//     },
//     // 定义验证码过期时间rules，5分钟
//     get expire() {
//         return () => {
//             return new Date().getTime() + 5 * 60 * 1000
//         }
//     }
// }

module.exports = connect_mongo;
