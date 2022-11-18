import React, { useState, useEffect } from "react";
import {
    Checkbox,
    Stack,
    FormControlLabel,
    Switch,
    TextField,
    FormHelperText,
    FormControl,
    Button,
} from "@mui/material";

function SettingsSubGeneral({
    smartCaching,
    darkMode,
    qrDelay,
    generalHash,
    setSmartCaching,
    setDarkMode,
    setQrDelay,
    setGeneralHash,
    updateUser,
}) {
    const [change, setChange] = useState(false);
    function handleChanges(e) {
        e.preventDefault();
        updateUser("general");
        setChange(false); // hiding "save changes" button
        setGeneralHash(
            String(smartCaching) + String(darkMode) + String(qrDelay)
        ); // reseting hash
        console.log(generalHash);
    }

    useEffect(() => {
        setChange(
            generalHash !==
                String(smartCaching) + String(darkMode) + String(qrDelay)
        );
    }, [smartCaching, darkMode, qrDelay]);

    const [fuck, setFuck] = useState(false);

    return (
        <div className="bg-slate-200fuck h-full w-full">
            <form action="" onSubmit={handleChanges}>
                <Stack className="ml-4 ">
                    <div className="text-2xl mb-4">General</div>
                    <Stack>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // defaultChecked
                                    checked={smartCaching}
                                    onClick={() =>
                                        setSmartCaching(!smartCaching)
                                    }
                                />
                            }
                            label="Smart caching"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    // defaultChecked
                                    checked={darkMode}
                                    onClick={() => setDarkMode(!darkMode)}
                                />
                            }
                            label="Dark Mode"
                        />
                        <FormControl>
                            <TextField
                                className="mt-4"
                                id="standard-basic"
                                label="Qr Delay"
                                variant="standard"
                                type="number"
                                size="small"
                                sx={{ width: 70 }}
                                value={qrDelay}
                                onChange={(e) => setQrDelay(e.target.value)}
                            />
                            <FormHelperText>
                                Delay for scanning qr code
                            </FormHelperText>
                        </FormControl>
                    </Stack>
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
            </form>
        </div>
    );
}

export default SettingsSubGeneral;
