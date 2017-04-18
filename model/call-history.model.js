const mongoose = require('./mongoose');

const CallHistorySchema = new mongoose.Schema({
    out: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
        required: true
    },
    in: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('callHistory', CallHistorySchema);