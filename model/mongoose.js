const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.mongodb.uri, config.mongodb.options);
mongoose.Promise =  require('bluebird');
module.exports = mongoose;