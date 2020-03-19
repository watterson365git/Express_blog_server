const mongoose = require('mongoose');//操作mongoDB数据库的中间件

//创建集合
const users = mongoose.model('users', new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 6,
    },
}));


//写入数据库这步在router中完成
// router.post('/see',async function(ctx, next) {
//     await users.create({
//         user_name:ctx.request.body.name,
//         passwords:ctx.request.body.passwd,
//         email:ctx.request.body.email
//     }).then((doc)=>{
//         console.log(doc);})
//         .catch(err=>{
//             console.log(err);
//         })
//     await console.log(ctx.request.body.name)
//     await ctx.render('form.html')
// })

module.exports = users;