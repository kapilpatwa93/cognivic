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
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const upload = multer({
    dest: "./public/uploads/images"

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post("/uploadSource",upload.single('file'), indexController.uploadSourceImage);
router.post("/uploadTarget",upload.single('file'), indexController.uploadTargetImage);
router.post("/checkMatch", indexController.checkMatch);
router.get('/testVision', indexController.testVision);

