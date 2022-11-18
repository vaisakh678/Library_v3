import React, { useState, useEffect } from "react";
import { TextField, Stack, Button } from "@mui/material";

function SettingsSubProfile({
    firstName,
    lastName,
    registerNumber,
    email,
    mobile,
    profileHash,
    setFirstName,
    setLastName,
    setRegisterNumber,
    setEmail,
    setMobile,
    setProfileHash,
    updateUser,
}) {
    useEffect(() => {
        setChange(
            profileHash !==
                firstName + lastName + registerNumber + email + mobile
        );
    }, [firstName, lastName, registerNumber, email, mobile]);

    const [change, setChange] = useState(false);
    async function handleChanges(e) {
        e.preventDefault();
        // code for fech api
        const res = await updateUser("profile");
        if (res.status === "ok") {
            setChange(false); // hiding "save changes" button
            setProfileHash(
                firstName + lastName + registerNumber + email + mobile
            ); // reseting hash
        }
    }

    return (
        <div>
            <div className="bg-slate-200fuck h-full ml-4 mb-4 w-full">
                <div className="text-2xl">Profile</div>
            </div>

            <form action="" onSubmit={handleChanges}>
                <Stack>
                    <Stack spacing={2} className="ml-4">
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="standard-basic"
                                label="First Name"
                                variant="standard"
                                size="small"
                                sx={{ width: 200 }}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <TextField
                                id="standard-basic"
                                label="Last Name"
                                variant="standard"
                                size="small"
                                sx={{ width: 200 }}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Stack>

                        <TextField
                            id="standard-basic"
                            label="Register number"
                            variant="standard"
                            size="small"
                            sx={{ width: 200 }}
                            value={registerNumber}
                            onChange={(e) => setRegisterNumber(e.target.value)}
                        />

                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            size="small"
                            sx={{ width: 200 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            id="standard-basic"
                            label="Mobile"
                            variant="standard"
                            size="small"
                            sx={{ width: 200 }}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </Stack>

                    <div
                        className={
                            change
                                ? "bg-slate-200fuck h-20 transition-all	duration-1000 overflow-hidden"
                                : "bg-slate-200fuck h-0 transition-all duration-1000 overflow-hidden"
                        }
                    >
                        <div className="my-4 mx-4">
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ width: 150 }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Stack>
            </form>
        </div>
    );
}

export default SettingsSubProfile;
