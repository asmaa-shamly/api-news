const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const News = mongoose.model('News', newsSchema)
module.exports = News