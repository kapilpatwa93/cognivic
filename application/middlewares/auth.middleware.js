const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.config');

module.exports = (req,res,next)=>{
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err,decoded)=>{
            if(err){
                customHelper.sendJsonError(res,httpStatus.BAD_REQUEST,"failed to authenticate",101);
                return;
            }else{
                req.user = decoded;
                next();
            }
        })
    }else{
        customHelper.sendJsonError(res,httpStatus.FORBIDDEN,  "token not provided",101);
        return;
    }
}