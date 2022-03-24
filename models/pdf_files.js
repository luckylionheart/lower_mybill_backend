const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('documents', PostSchema);