const mongoose = require('mongoose');
const constants = require('../common/constants');
const customHelper = require('../common/customhelper');
require('../models/service-centre.model');
const ServiceCentre = mongoose.model('ServiceCentre');
const httpStatus = require('http-status');
const request = require('request-promise');
const cheerio = require('cheerio');
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const upload = multer({
    dest: "./public/uploads/images"

});
module.exports.uploadImage = async (data, type) => {
   try {
        const tempPath = data.file.path;
        const targetPath = path.join(`./public/uploads/images/${type}.png`);
        if (path.extname(data.file.originalname).toLowerCase() === ".png" || path.extname(data.file.originalname).toLowerCase() === ".png") {
            const file = fs.renameSync(tempPath, targetPath);
            console.log("file",file);
            return "uploaded successfully";
        } else {
            fs.unlink(tempPath, err => {
                if (err) {
                    throw new Error(err);
                }
                throw new Error("Invalid Format");
            });
        }
    } catch(err) {
       console.log("here error");
       throw new Error(err);
    }
}
