const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    registerNumber: String,
    email: String,
    mobile: String,
    smartCaching: Boolean,
    darkMode: Boolean,
    qrDelay: Number,
    password: String,
    type: String,
    disenable: false,
    register_date: String,
});

module.exports = mongoose.model("User", user_schema);
