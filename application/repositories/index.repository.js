const mongoose = require('mongoose');
const constants = require('../common/constants');
const customHelper = require('../common/customhelper');
require('../models/service-centre.model');
const ServiceCentre = mongoose.model('ServiceCentre');
const visionRepository = require('./vision.repository');
const httpStatus = require('http-status');
const request = require('request-promise');
const cheerio = require('cheerio');
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const www = require('../../bin/www');
const upload = multer({
    dest: "./public/uploads/images"

});
module.exports.uploadImage = async (data, type) => {
   try {
        const tempPath = data.file.path;
        const targetPath = path.join(`./public/uploads/images/${type}.jpg`);
        if (path.extname(data.file.originalname).toLowerCase() === ".jpg" || path.extname(data.file.originalname).toLowerCase() === ".jpeg") {
            const file = fs.renameSync(tempPath, targetPath);
            visionRepository.analyzeImage(type);
            www.io.emit('result', {match : true,labels: ["apple", "banana"]});
            return "uploaded successfully";
        }
    } catch(err) {
       throw new Error(err);
    }
}
