var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    make: String,
    model: String,
    color: String
});

module.exports = mongoose.model('Car', CarSchema);