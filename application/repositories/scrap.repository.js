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
module.exports.scrap = () => {
    pageCount = 1;
    return new Promise((resolve, reject) => {
        this.reset().then(() => {
            return this.scrapPage();
        })
            .then((done) => {
                resolve(done)
            }).catch((err) => {
            reject(err);
        });
    })
};

module.exports.scrapPage = () => {
    let _self = this;
    return new Promise((resolve, reject) => {
        options.uri = "https://www.carworkz.com/mumbai/regular-service?format=json&page=" + pageCount;
        request(options)
            .then(($) => {
                let docs = [];
                if ($('.animate').length != 0) {
                    $('.animate').each(function (i, elem) {
                        let doc = _self.fetchAttributes($, elem);
                        docs.push(doc);
                    });
                    pageCount++;
                    ServiceCentre.insertMany(docs).then((result) => {
                        /*recursive call for next page*/
                        resolve(this.scrapPage());
                    }).catch((err) => {
                        this.reset().then(() => {
                            let errorObj = {
                                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                                message: constants.error_message.store_error_reset,
                                code: constants.error_code.store_error_reset
                            };

                            reject(errorObj);
                        }).catch(() => {
                            let errorObj = {
                                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                                message: constants.error_message.store_error,
                                code: constants.error_code.store_error
                            };
                            reject(errorObj);
                        })
                        return;
                    });
                } else {
                    /*if page does not contain data , end recursion*/
                    resolve(true);
                }

            })
            .catch((err) => {
                this.reset().then(() => {
                    let errorObj = {
                        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                        message: constants.error_message.store_error_reset,
                        code: constants.error_code.store_error_reset
                    };
                    reject(errorObj);
                }).catch(() => {
                    let errorObj = {
                        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                        message: constants.error_message.store_error,
                        code: constants.error_code.store_error
                    };
                    reject(errorObj);
                });
            });
        }
    )
};

module.exports.reset = () => {
    return ServiceCentre.remove({});
}

module.exports.fetchAttributes = ($, dom) => {
    let auth = [];
    $(dom).find('.btn-orange').each((tag, elem) => {
        auth.push($(elem).text().trim());
    })
    let features = [];
    $(dom).find('.info').each((tag, elem) => {
        features.push($(elem).attr('title').substr(2));
    });
    let working_days = [];
    $(dom).find(".wrk_days").find('li').not('.off').each(function (i, elem) {
        working_days.push($(elem).text().trim())
    });
    let services = [];
    $(dom).find(".list_jobs").find('a').each(function (i, elem) {
        services.push($(elem).attr('title').substr("2"));
    });

    //couldnt access element using .active class
    /*
    let service_quality_rating;
    let billing_transperancy_rating;
    let timely_delivery_rating;
    $(dom).find('.rating_list').each(function(i,elem){
        if($(elem).parent().find('.text_summary').text() == 'Service Quality'){
            service_quality_rating =  $(elem).find('.active').length;
        }else if($(elem).parent().find('.text_summary').text() == 'Billing Transparency'){
            billing_transperancy_rating =  $(elem).find('.active').length;
        }else if($(elem).parent().find('.text_summary').text() == 'Timely Delivery'){
            timely_delivery_rating =  $(elem).find('.active').length;
        }
    })
*/
    let doc = {
        name: $(dom).find(".head_title").text(),
        overall_rating: $(dom).find(".number_rating").text(),
        experience_in_years: $(dom).find(".yrs_exp").text().split(" ")[0],
        votes_percentage: $(dom).find(".per_votes").text().trim(),
        total_votes: $(dom).find(".txt_votes").text().trim().split(' ')[0],
        work_timings: $(dom).find(".wrk_timing").text().trim(),
        // authorized : $(this).find('.btn-orange').map((i,elem) =>$(elem).text().trim())
        authorized: auth,
        features: features,
        working_days: working_days,
        services: services
        /* service_quality_rating : service_quality_rating,
         billing_transperancy_rating : billing_transperancy_rating,
         timely_delivery_rating : timely_delivery_rating*/
    }
    return doc;
};
module.exports.search = (data) => {
    let query = {};
    if (data.hasOwnProperty('name')) {
        query.name = new RegExp(data.name, 'i')
    }
    if (data.hasOwnProperty('authorized_by')) {
        let regex = [];
        for (let i = 0; i < data.authorized_by.length; i++) {
            regex[i] = new RegExp(data.authorized_by[i], 'i');
        }
        // query.authorized_by= new RegExp(data.authorized_by,'i')
        query.authorized = {$in: regex};
    }
    if (data.hasOwnProperty('min_ratings')) {
        query.overall_rating = {$gte: data.min_ratings}
    }
    if (data.hasOwnProperty('services')) {
        let regex = [];
        for (let i = 0; i < data.services.length; i++) {
            regex[i] = new RegExp(data.services[i], 'i');
        }
        query.services = {$in: regex};
    }
    if (data.hasOwnProperty('features')) {
        let regex = [];
        for (let i = 0; i < data.features.length; i++) {
            regex[i] = new RegExp(data.features[i], 'i');
        }
        query.features = {$in: regex};
    }
    return ServiceCentre.find(query);
}