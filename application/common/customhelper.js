
const commonConfig = require('../../config/common.config');
const constants = require('../common/constants');
const httpStatus = require('http-status');
const CustomHelper = {};
CustomHelper.sendJsonResponse = function (res,status,data,msg) {

    let response;
        response = {
            success : true,
        };
        if(data)
            response['data'] = data;

        if(msg)
            response['message'] = msg;
    res.status(status).json(response);
    return;

};

CustomHelper.sendJsonError = function (res,err) {
    let response;
    let statusCode;
    console.log(err);
    if(err.hasOwnProperty('statusCode')){
        statusCode = err.statusCode;
        response = {
            success : false,
            error : {
                message : err.message,
                code : err.code
            },

        }
    }else{
        statusCode= httpStatus.INTERNAL_SERVER_ERROR;
        response = {
            success : false,
            error : {
                message : constants.error_message.general_error,
                code : constants.error_code.general_error
            },

        };
    }
    res.status(statusCode).json(response);
    return;
};
module.exports = CustomHelper;