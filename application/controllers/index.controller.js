const customValidator = require('../common/customvalidator');
const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const constants = require('../common/constants');



const indexRepository = require('../repositories/index.repository');
const visionRepository = require('../repositories/vision.repository');

module.exports.uploadSourceImage = (req, res, next) => {
    console.log("uoloadSource Image");
    indexRepository.uploadImage(req, 'source').then((response) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, response, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};
module.exports.uploadTargetImage = (req, res, next) => {
    indexRepository.uploadImage(req, 'target').then((reponse) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, reponse, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};
module.exports.testVision = (req, res, next) => {
    visionRepository.testVision(req.query).then((category) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, category, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};
