const mongoose = require('mongoose');

var categorySchema = mongoose.Schema({

    name : {
        type : String,
    },
    authorized : [],
    experience_in_years : Number,
    overall_rating : Number,
    votes_percentage : String,
    total_votes : Number,
    features : [],
    working_days : [],
    work_timings : String,
    services : [],
    service_quality_rating : Number,
    billing_transperancy_rating : Number,
    timely_delivery_rating:Number,
});

module.exports = mongoose.model('ServiceCentre', categorySchema);