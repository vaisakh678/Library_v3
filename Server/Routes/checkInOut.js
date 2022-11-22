const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require("moment");
const router = express.Router();

const Visitor = require("../models/Visitor");
const CheckInOutLog = require("../models/CheckInOutLog");

const SECRETE_KEY = "636fc6a1559182e8783d0f43";
const TIME_OUT = 60; // units in minutes
mongoose.connect("mongodb://localhost:27017/Library_V3");

const handleCheckIn = async (visitor, validator) => {
    const token = await CheckInOutLog.create({
        registerNumber: visitor.registerNumber,
        visitorId: visitor._id,
        verifiedBy: validator,
        checkin: Date.now(),
        checkout: null,
        status: "checkedIn",
    });

    await Visitor.updateOne(
        { _id: visitor._id },
        {
            $set: { isVisiting: true, tokenId: token._id },
        }
    );

    console.log(`"${visitor.registerNumber}" has successfully checkedIn`);
};

const handleCheckOut = async (visitor) => {
    const token = await CheckInOutLog.findOne({
        _id: visitor.tokenId,
    });
    const diff = Math.floor((Date.now() - token.checkin) / 60000);
    console.log(
        `checkin time: ${moment(token.checkin).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
        )}`
    );
    console.log(`total time spend: ${diff} Minutes`);
    if (diff <= TIME_OUT) {
        await CheckInOutLog.updateOne(
            {
                _id: visitor.tokenId,
            },
            {
                $set: {
                    checkout: Date.now(),
                    status: "checkedOut",
                },
            }
        );
        await Visitor.updateOne(
            { _id: visitor._id },
            {
                $set: { isVisiting: false },
            }
        );
        console.log(`"${visitor.registerNumber}" has successfully checkedOut`);
        return 0;
    } else {
        console.log("terminated");
        return 1;
    }
};

const handleTimeout = async (visitor) => {
    await Visitor.updateOne(
        { _id: visitor._id },
        {
            $set: { isVisiting: false },
        }
    );

    await CheckInOutLog.updateOne(
        {
            _id: visitor.tokenId,
        },
        {
            $set: {
                checkout: Date.now(),
                status: "timeout",
            },
        }
    );
};

router.post("/", async (req, res) => {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, SECRETE_KEY);
    if (!decode) {
        res.json({ status: "err", err: "token error" });
        console.log("token error");
        return;
    }
    try {
        const visitor = await Visitor.findOne({
            registerNumber: req.body.registerNumber.toLowerCase(),
        });

        if (!visitor) {
            console.log(
                `${req.body.registerNumber.toLowerCase()} has not been registered`
            );
            res.json({ status: "ok", data: { status: "notFound" } });
            return;
        }

        if (visitor.isVisiting) {
            console.log("visiting");
            const status = await handleCheckOut(visitor, decode.registerNumber);
            if (status == 0) {
                res.json({ status: "ok", data: { status: "checkedOut" } });
            } else {
                handleTimeout(visitor);
                res.json({ status: "ok", data: { status: "Timeout" } });
            }
        } else {
            await handleCheckIn(visitor, decode.registerNumber);
            res.json({ status: "ok", data: { status: "checkedIn" } });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

module.exports = router;
