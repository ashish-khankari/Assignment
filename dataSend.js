const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cities: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', dataSchema)

module.exports = User