const mongoose = require("mongoose")
const Schema = mongoose.Schema

const receiverSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    blood: {type: String, required: true},
    password: {type: String}
})

const receiverModel = mongoose.model("User", receiverSchema)
module.exports = receiverModel