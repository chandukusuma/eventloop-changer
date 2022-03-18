const mongoose = require("mongoose");
const Date = require("date-and-time")



const listSchema = new mongoose.Schema({
    text:{type:String, required: true},
    dateTime : {type: String, required: false}
}, {
    versionKey: false
})

const list = mongoose.model("list", listSchema);

module.exports = list
