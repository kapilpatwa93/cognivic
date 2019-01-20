const mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    labels : {
        type : Array,
    },
    type: {
        type: String
    },
    createdOn: {
        type: Date
    }
});

module.exports = mongoose.model('Image', imageSchema);
