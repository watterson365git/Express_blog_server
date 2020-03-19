const mongoose = require('mongoose');//操作mongoDB数据库的中间件

//创建集合
const articles = mongoose.model('articles', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    pic:{
        type: String,
        required: true

    },
    kind:{
        type: String,
        required: true
    },
    describe:{
        type: String,
        required: true
    },
    article:{
        type: String,
        required: true
    }

}));

module.exports = articles;