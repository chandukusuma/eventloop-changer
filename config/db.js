const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/employs")
    // .then(() => console.log("Database connected!"))
    // .catch(err => console.log(err))
}