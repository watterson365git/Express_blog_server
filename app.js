var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressJwt = require('express-jwt')
var cors = require('cors')
var history = require('connect-history-api-fallback');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managerRouter = require('./routes/manager');

var app = express();

app.use(cors())
//
// app.use(history({
//   rewrites: [
//     { from: /^\/login/, to: '/' }
//   ]
// }))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);



// app.use(expressJwt({
//   secret: 'user_pass_xxx' // 签名的密钥 或 PublicKey
// }).unless({
//   path: ['/login', '/register']  // 指定路径不经过 Token 解析
// }))
//





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//解决前后端路由冲突问题，要写在最后
//sendFile()由express提供，所以不适用于其它服务
// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
// })


module.exports = app;
