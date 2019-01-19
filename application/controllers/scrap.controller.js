const customValidator = require('../common/customvalidator');
const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const constants = require('../common/constants');

const scrapRepository = require('../repositories/scrap.repository');

module.exports.scrap = (req, res, next) => {
    scrapRepository.scrap(req.query).then((category) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, category, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};
module.exports.reset= (req, res, next) => {
    scrapRepository.reset(req.query).then((category) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, null,"Data cleared successfully");
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};

module.exports.search = (req,res,next)=>{
    let rules = {};
    if(req.body.hasOwnProperty('name')  ){
        rules.name = customValidator.name
    }
    if(req.body.hasOwnProperty('authorized_by')){
        rules.authorized_by = customValidator.authorized_by
    }
    if(req.body.hasOwnProperty('services')){
        rules.services = customValidator.services
    }
    if(req.body.hasOwnProperty('features')){
        rules.features = customValidator.features
    }
    if(req.body.hasOwnProperty('min_ratings')){
        rules.min_ratings = customValidator.min_ratings
    }
    customValidator.validate(req, rules).then(() => {
        return scrapRepository.search(req.body);
    }).then((list) => {
        customHelper.sendJsonResponse(res, httpStatus.OK, list, null);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
}