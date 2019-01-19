const mongoose = require('mongoose');
const constants = require('../common/constants');
const vision = require('@google-cloud/vision');
const customHelper = require('../common/customhelper');
require('../models/service-centre.model');
const ServiceCentre = mongoose.model('ServiceCentre');
const httpStatus = require('http-status');
const request = require('request-promise');
const cheerio = require('cheerio');
const www = require('../../bin/www');
let pageCount = 1;
const options = {

    transform: function (body) {
        return cheerio.load(body);
    }
};
module.exports.testVision = async (data) => {
    const client = new vision.ImageAnnotatorClient({
        projectId: 'theta-cell-229110',
        keyFilename: './config/vision.json'
    });
    const results = await client.labelDetection('./public/uploads/images/source.jpg');
    const labels = results[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    www.io.emit('join', 'Hello World from client');
    // io.emit('test',"this is message");
    return labels;
};



