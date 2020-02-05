var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.sendFile(path.join(__dirname, '../dist/index.html'))

});


router.get('/photo/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.sendFile(path.join(__dirname, '../dist/photo.html'))

});




router.get('/blog', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  let name = unescape(req.query.name);
  let str = '../public/all/'+ name;
  //console.log(unescape(req.query.name));
  console.log(str);
  res.sendFile(path.join(__dirname, str))

});


router.get('/show', function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  fs.readdir(path.join(__dirname, '../public/all'), function (err, all) {
    if (err) {
      console.log(err);
    } else {
      res.send(all)
    }
  });  });


router.get('/vue', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    fs.readdir(path.join(__dirname, '../public/vue'), function (err, all) {
      if (err) {
        console.log(err);
      } else {
        res.send(all)
      }
    });  });


router.get('/css', function(req, res, next) {

      res.header("Access-Control-Allow-Origin", "*");

      fs.readdir(path.join(__dirname, '../public/css'), function (err, all) {
        if (err) {
          console.log(err);
        } else {
          res.send(all)
        }
      });  });


router.get('/html', function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");

        fs.readdir(path.join(__dirname, '../public/html'), function (err, all) {
          if (err) {
            console.log(err);
          } else {
            res.send(all)
          }
        });  });


router.get('/javascript', function(req, res, next) {

          res.header("Access-Control-Allow-Origin", "*");

          fs.readdir(path.join(__dirname, '../public/javascript'), function (err, all) {
            if (err) {
              console.log(err);
            } else {
              res.send(all)
            }
          });  });


router.get('/miniapp', function(req, res, next) {

            res.header("Access-Control-Allow-Origin", "*");

            fs.readdir(path.join(__dirname, '../public/miniapp'), function (err, all) {
              if (err) {
                console.log(err);
              } else {
                res.send(all)
              }
            });  });











module.exports = router;
