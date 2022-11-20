const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Visitor = require("./models/Visitor");

const PORT = 3001;
const SECRETE_KEY = "636fc6a1559182e8783d0f43";
mongoose.connect("mongodb://localhost:27017/Library_V3");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login/", async (req, res) => {
    const registerNumber = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({ registerNumber, password });
        if (user) {
            const token = jwt.sign(
                {
                    registerNumber,
                    id: user._id,
                    email: user.email,
                    type: user.type,
                },
                SECRETE_KEY
            );
            res.json({ status: "ok", token });
            console.log(`"${registerNumber}" has successfully logged in`);
        } else res.json({ status: "ok" });
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/user", async (req, res) => {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, SECRETE_KEY);
    if (!decode) {
        res.json({ status: "err", err: "token error" });
        console.log("token error");
        return;
    }
    try {
        const user = await User.findOne({ _id: decode.id }, { password: 0 });
        console.log(`${user["registerNumber"]} fetched his details`);
        res.json({ status: "ok", user });
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/update-user", async (req, res) => {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, SECRETE_KEY);
    if (!decode) {
        res.json({ status: "err", err: "token error" });
        console.log("token error");
        return;
    }
    try {
        let settings = {};
        if (req.body.hasOwnProperty("firstName"))
            settings.firstName = req.body.firstName;
        if (req.body.hasOwnProperty("lastName"))
            settings.lastName = req.body.lastName;
        if (req.body.hasOwnProperty("registerNumber"))
            settings.registerNumber = req.body.registerNumber;
        if (req.body.hasOwnProperty("email")) settings.email = req.body.email;
        if (req.body.hasOwnProperty("registerNumber"))
            settings.mobile = req.body.mobile;
        if (req.body.hasOwnProperty("smartCaching"))
            settings.smartCaching = req.body.smartCaching;
        if (req.body.hasOwnProperty("darkMode"))
            settings.darkMode = req.body.darkMode;
        if (req.body.hasOwnProperty("qrDelay"))
            settings.qrDelay = req.body.qrDelay;

        console.log(settings);
        await User.updateOne({ _id: decode.id }, { $set: settings });
        res.json({ status: "ok" });
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/register-visitor", async (req, res) => {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, SECRETE_KEY);
    if (!decode) {
        res.json({ status: "err", err: "token error" });
        console.log("token error");
        return;
    }
    try {
        const isExist = await Visitor.findOne({
            registerNumber: req.body.registerNumber.toLowerCase(),
        });
        if (isExist) {
            res.json({ status: "ok", exist: true });
            console.log(
                `"${req.body.registerNumber}" already exists cannot register..`
            );
        } else {
            await Visitor.create({
                firstName: req.body.firstName,
                lastName: req.body.secondName,
                registerNumber: req.body.registerNumber.toLowerCase(),
                type: req.body.type,
                Course: req.body.department,
                year: req.body.year,
                department: req.body.department,
                registerBy: decode.registerNumber,
                registeredOn: Date.now(),
                isVisiting: false,
            });
            console.log(
                `"${req.body.registerNumber}" registered successully..`
            );
            res.json({ status: "ok", exist: false });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

const checkInOutRouter = require("./Routes/checkInOut");
app.use("/api/checkInOut", checkInOutRouter);

app.listen(PORT, () => {
    console.log("server is up🚀");
});
