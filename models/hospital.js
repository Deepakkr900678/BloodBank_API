const mongoose = require("mongoose")
const Schema = mongoose.Schema

const hospitalSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    blood: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const hospitalModel = mongoose.model("Blog", hospitalSchema)
module.exports = hospitalModel