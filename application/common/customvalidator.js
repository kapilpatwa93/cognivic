const expressValidator = require('express-validator');
const constants = require("./constants");
const httpStatus = require('http-status');
const customValidator = {};


customValidator.url= {
    notEmpty: {
        errorMessage: 'URL is required'
    },
    isURL: {
        errorMessage: 'Invalid Url'
    },
};
customValidator.name= {
    notEmpty: {
        errorMessage: 'Name is required'
    },
};
customValidator.authorized_by= {
    notEmpty: {
        errorMessage: 'Authorized by is required'
    },
    isArray : {
        errorMessage : "Authorized by should be an array"
    }
};

customValidator.min_ratings= {
    notEmpty: {
        errorMessage: 'min rating is required'
    },
    isNumeric : {
        errorMessage : "min rating should be number"
    }
};

customValidator.working_days = {
    notEmpty : {
        errorMessage : 'working days is required',
    },
    isArray : {
        errorMessage : "working days should be an array"
    }
}
customValidator.features = {
    notEmpty : {
        errorMessage : 'features is required',
    },
    isArray : {
        errorMessage : "features should be an array"
    }
}
customValidator.services = {
    notEmpty : {
        errorMessage : 'services is required',
    },
    isArray : {
        errorMessage : "services should be an array"
    }
}

customValidator.validate = (req, rules) => {
    return new Promise((resolve,reject)=>{
        req.check(rules);
        req.getValidationResult().then(result => {
            if (!result.isEmpty()) {
                let errorObj = {
                    statusCode : httpStatus.BAD_REQUEST,
                    message :   result.mapped(),
                    code : constants.error_code.validation_error,

                };
                reject(errorObj);
                return;
            } else {
                resolve(req);
                return;
            }
        });
    })
};
customValidator.middlewareObj = {
    customValidators: {
        duplicateCategory : customValidator.duplicateCategory,
        isArray : ((values)=>{
            return Array.isArray(values) && values.length > 0;
        }),
    },
    errorFormatter: function (param, msg, value, location) {
        return {
            msg: msg,
            value: value
        };
    },
    customSanitizers : {
        toSlug : (value =>{
            return value.toLowerCase().trim();
        }),
        toSlugArray : (valArr=>{
            return valArr.map((val)=>{
                return val.toLowerCase().trim();
            })
        }),
        toPrice : (value=>{
            return parseFloat(value).toFixed(2);
        })
    }
};
module.exports = customValidator;

