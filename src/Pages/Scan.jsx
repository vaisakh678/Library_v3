import React, { useState, forwardRef, useRef } from "react";
import SettingsSelect from "../Components/SettingsSelect";
import QrScanner from "../Components/QrScanner";

import QrInput from "../Components/QrInput";
import QrCodeIcon from "@mui/icons-material/QrCode";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SpeakerPhoneIcon from "@mui/icons-material/SpeakerPhone";
import { Snackbar } from "@mui/material";

import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Scan() {
    const [selectedOption, setSelectedOption] = useState("scanner");
    const [notification, setNotification] = useState(false);
    const msgRef = useRef({});

    async function handleScan(registerNumber) {
        // if (e) e.preventDefault();
        const response = await fetch("http://localhost:3001/api/checkInOut", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                registerNumber,
            }),
        });
        const data = await response.json();
        msgRef.current.registerNumber = registerNumber;
        if (data.status === "ok") {
            if (data.data.status === "checkedIn")
                msgRef.current.severity = "success";
            else if (data.data.status === "checkedOut")
                msgRef.current.severity = "info";
            setNotification(true);
            console.log(msgRef.current);
        }
    }

    return (
        <div className="h-full contentWidth">
            <div className="contentTitle bg-slate-50fuck border-b-2 border-slate-200 px-4 flex items-center">
                Scan
            </div>
            <div className="contentContainer flex justify-center p-4 items-center ">
                <div className="content-wrapper h-3/4 w-9/12 bg-slate-300fuck flex">
                    <div className="menu w-3/12 h-full bg-green-200fuck">
                        <SettingsSelect
                            label="Scanner"
                            icon={<QrCodeIcon />}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />

                        <SettingsSelect
                            label="Input"
                            icon={<KeyboardIcon />}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />

                        <SettingsSelect
                            label="Hardware"
                            icon={<SpeakerPhoneIcon />}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>

                    <div className="menu-items bg-blue-300fuck w-6/12 h-full px-2">
                        {selectedOption === "scanner" ? (
                            <QrScanner handleScan={handleScan} />
                        ) : null}
                        {selectedOption === "input" ? (
                            <QrInput handleScan={handleScan} />
                        ) : null}
                    </div>
                </div>
            </div>
            <Snackbar
                open={notification}
                autoHideDuration={3000}
                onClose={(e, reason) => {
                    console.log(reason);
                    setNotification(false);
                }}
                TransitionComponent={(props) => (
                    <Slide {...props} direction="right" />
                )}
            >
                <Alert
                    onClose={() => setNotification(false)}
                    severity={msgRef.current.severity}
                >
                    {`${msgRef.current.registerNumber} has Checkedout`}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Scan;
