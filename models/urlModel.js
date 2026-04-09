const mongoose = require("mongoose")


const urlSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    importance:{
        type: String,
        required: true
    },
    url_id: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
})


const urlModel = mongoose.model("url", urlSchema)

module.exports = urlModel