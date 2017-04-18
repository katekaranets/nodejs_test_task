const mongoose = require('./mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: true
    },
    callHistory: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('contact', ContactSchema);