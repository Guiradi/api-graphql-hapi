const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    favoriteWebsites: [String]
})

module.exports = mongoose.model('User', userSchema)