import React, { useState, useEffect } from "react";
import SettingsSelect from "../Components/SettingsSelect";
import TuneIcon from "@mui/icons-material/Tune";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSubGeneral from "../Components/SettingsSubGeneral";
import SettingsSubProfile from "../Components/SettingsSubProfile";
import SettingsSubAddVisitor from "../Components/SettingsSubAddVisitor";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function Settings() {
    const [selectedOption, setSelectedOption] = useState("profile");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerNumber, setRegisterNumber] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [profileHash, setProfileHash] = useState("");

    const [smartCaching, setSmartCaching] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [qrDelay, setQrDelay] = useState(0);
    const [generalHash, setGeneralHash] = useState("");

    async function fetchUser() {
        const response = await fetch("http://localhost:3001/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        });
        const data = await response.json();

        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setRegisterNumber(data.user.registerNumber);
        setEmail(data.user.email);
        setMobile(data.user.mobile);
        setProfileHash(
            data.user.firstName +
                data.user.lastName +
                data.user.registerNumber +
                data.user.email +
                data.user.mobile
        );

        setSmartCaching(data.user.smartCaching);
        setDarkMode(data.user.darkMode);
        setQrDelay(data.user.qrDelay);
        setGeneralHash(
            String(data.user.smartCaching) +
                String(data.user.darkMode) +
                String(data.user.qrDelay)
        );
    }

    async function updateUser(arg) {
        let change;
        if (arg === "profile") {
            change = {
                firstName,
                lastName,
                registerNumber,
                email,
                mobile,
            };
        } else change = { smartCaching, darkMode, qrDelay };
        const response = await fetch("http://localhost:3001/api/update-user", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(change),
        });
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="h-full contentWidth">
            <div className="contentTitle bg-slate-50fuck border-b-2 border-slate-200 px-4 flex items-center">
                Settings
            </div>
            <div className="contentContainer flex justify-center items-center bg-slate-200fuck">
                <div className="settingsTypes flex h-3/4 w-9/12 bg-slate-100fuck">
                    <div className="settingsList w-3/12 h-full bg-blue-400fuck ">
                        <SettingsSelect
                            icon={<PersonIcon />}
                            label="Profile"
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />

                        <SettingsSelect
                            icon={<TuneIcon />}
                            label="General"
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />

                        <SettingsSelect
                            icon={<PersonAddAlt1Icon />}
                            label="Add Visitor"
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                    <div className="settingsContent w-9/12 h-full bg-green-400fuck">
                        {selectedOption === "profile" ? (
                            <SettingsSubProfile
                                firstName={firstName}
                                lastName={lastName}
                                registerNumber={registerNumber}
                                email={email}
                                mobile={mobile}
                                profileHash={profileHash}
                                setFirstName={setFirstName}
                                setLastName={setLastName}
                                setRegisterNumber={setRegisterNumber}
                                setEmail={setEmail}
                                setMobile={setMobile}
                                setProfileHash={setProfileHash}
                                updateUser={updateUser}
                            />
                        ) : null}
                        {selectedOption === "general" ? (
                            <SettingsSubGeneral
                                smartCaching={smartCaching}
                                darkMode={darkMode}
                                qrDelay={qrDelay}
                                generalHash={generalHash}
                                setSmartCaching={setSmartCaching}
                                setDarkMode={setDarkMode}
                                setQrDelay={setQrDelay}
                                setGeneralHash={setGeneralHash}
                                updateUser={updateUser}
                            />
                        ) : null}
                        {selectedOption === "add visitor" ? (
                            <SettingsSubAddVisitor />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
