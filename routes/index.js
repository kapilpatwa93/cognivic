var express = require('express');
var router = express.Router();
const indexController = require('../application/controllers/index.controller');
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    uri: `https://www.google.com`,
    transform: function (body) {
        return cheerio.load(body);
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get("/uploadImage", indexController.uploadImage);

