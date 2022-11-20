import React, { useState, useCallback, useEffect } from "react";
import { Button, IconButton, Stack, Paper } from "@mui/material";
import { QrReader } from "react-qr-reader";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CancelIcon from "@mui/icons-material/Cancel";
import WatchDogs from "../assets/WatchDogs.svg";

function QrScanner({ handleScan }) {
    const [enableScanner, setEnableScanner] = useState(false);
    const [result, setResult] = useState(false);

    async function handleResult(res) {
        setResult(res);
        handleScan(res); // api for sending the register number
        await setTimeout(() => {
            setResult(false);
            setEnableScanner(false);
        }, [5000]);
    }

    const handleKeyPress = useCallback((event) => {
        if (event.key === " ") {
            console.log("its fucking space");
            setEnableScanner((prev) => !prev);
        }
    }, []);

    useEffect(() => {
        // attach the event listener
        document.addEventListener("keydown", handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div className=" border border-slate-400 rounded bg-slate-300 h-full w-full">
            {!enableScanner ? (
                <div className="activate-scan h-full w-full flex justify-center items-center">
                    <Button
                        onClick={() => setEnableScanner(true)}
                        variant="contained"
                        endIcon={<QrCodeScannerIcon />}
                    >
                        Start Scan
                    </Button>
                </div>
            ) : null}
            {enableScanner ? (
                <div className="scan h-full w-full">
                    <div className="w-full h-88 flex justify-evenly items-center flex-col ">
                        <div className="camera w-60 h-60 bg-slate-400fuck border border-slate-400fuck">
                            {result ? (
                                <img
                                    src={WatchDogs}
                                    className="w-full h-full"
                                    alt="initilizating...."
                                />
                            ) : (
                                <QrReader
                                    onResult={(result, error) => {
                                        if (!!result) {
                                            // setResult(result?.text);
                                            handleResult(result?.text);
                                        }

                                        if (!!error) {
                                            console.info(error);
                                        }
                                    }}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </div>
                        <div className="result">
                            {result ? result : "No result"}
                        </div>
                    </div>
                    <div className="cancel-btn h-12 flex flex-row-reverse items-center">
                        <Stack>
                            <IconButton onClick={() => setEnableScanner(false)}>
                                <CancelIcon fontSize="large" />
                            </IconButton>
                        </Stack>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default QrScanner;
