const mongoose = require('mongoose');
const constants = require('../common/constants');
const vision = require('@google-cloud/vision');
const customHelper = require('../common/customhelper');
require('../models/service-centre.model');
require('../models/image.model');
const ServiceCentre = mongoose.model('ServiceCentre');
const httpStatus = require('http-status');
const request = require('request-promise');
const cheerio = require('cheerio');
const www = require('../../bin/www');
const imageModel = mongoose.model('Image');
const _ = require('lodash');
const fs = require('fs');
let pageCount = 1;
const options = {

    transform: function (body) {
        return cheerio.load(body);
    }
};
module.exports.analyzeImageOld = async (image) => {
    const client = new vision.ImageAnnotatorClient({
        projectId: 'theta-cell-229110',
        keyFilename: './config/vision.json'
    });
    const results = await client.labelDetection(`./public/uploads/images/${image}.jpg`);
    const labels = results[0].labelAnnotations;

    www.io.emit('result', 'Hello World from client');
    const imageFile = new imageModel({ labels, type: image, createdOn : new Date() });
    const imageSaved = await imageFile.save();
    return labels;
};
module.exports.analyzeImage = async (image) => {
     const fileName = `./public/uploads/images/${image}.jpg`;
    const request = {
        image: {content: fs.readFileSync(fileName)},
    };
    const client = new vision.ImageAnnotatorClient({
        projectId: 'theta-cell-229110',
        keyFilename: './config/vision.json'
    });
    const [result] = await client.objectLocalization(request);
    const labels = result.localizedObjectAnnotations;
    const imageFile = new imageModel({ labels, type: image, createdOn : new Date() });
    const imageSaved = await imageFile.save();
    return labels;
};

module.exports.compareImage = async (image) => {
    const [source, target]  = await Promise.all([
        imageModel.findOne({type: "source"}, {},{sort:{createdOn : -1}}),
        imageModel.findOne({type: "target"}, {},{sort:{createdOn : -1}}),
    ]);
    let matched = _.intersectionWith(target.labels, source.labels, (src, tgt) => {
        return src.name === tgt.name;
    });
    matched = _.sortBy(matched, label => label.score);
    return {
        matched: !!matched.length,
        objects: matched
    };
};



