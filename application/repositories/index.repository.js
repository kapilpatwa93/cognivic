const mongoose = require('mongoose');
const constants = require('../common/constants');
const customHelper = require('../common/customhelper');
require('../models/service-centre.model');
const ServiceCentre = mongoose.model('ServiceCentre');
const httpStatus = require('http-status');
const request = require('request-promise');
const cheerio = require('cheerio');
let pageCount = 1;
const options = {

    transform: function (body) {
        return cheerio.load(body);
    }
};
module.exports.uploadImage = (data) => {
    console.log("write logic to save image here");
}
