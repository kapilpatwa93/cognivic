const customValidator = require('../common/customvalidator');
const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const constants = require('../common/constants');

const indexRepository = require('../repositories/index.repository');

module.exports.uploadImage = (req, res, next) => {
    indexRepository.uploadImage(req.query).then((category) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, category, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};
