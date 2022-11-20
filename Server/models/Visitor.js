const mongoose = require("mongoose");

const visitor_schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    registerNumber: String,
    type: String,
    Course: String,
    year: Number,
    department: String,
    registerBy: String,
    registeredOn: Date,
    isVisiting: false,
    tokenId: String,
});

module.exports = mongoose.model("visitor", visitor_schema);
