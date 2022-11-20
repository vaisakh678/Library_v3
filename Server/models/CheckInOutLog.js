const mongoose = require("mongoose");

const logs_schema = new mongoose.Schema({
    registerNumber: String,
    visitorId: String,
    verifiedBy: String,
    checkin: Date,
    checkout: Date,
    status: String,
});

module.exports = mongoose.model("CheckInOutLogs", logs_schema);
