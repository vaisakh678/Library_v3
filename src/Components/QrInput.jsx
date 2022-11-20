import React, { useState } from "react";
import { TextField, Stack, IconButton, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function QrInput({ handleScan }) {
    const [input, setInput] = useState("");
    // const [input, setInput] = useState("kh.sc.p2mca21032");
    function handleSubmit(e) {
        e.preventDefault();
        handleScan(input);
        setInput("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="border border-slate-400 rounded bg-slate-300 h-full w-full flex items-center justify-center"
        >
            <Stack direction="row" spacing={2}>
                <TextField
                    id="standard-basic"
                    label="Register number"
                    variant="outlined"
                    size="small"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    endIcon={<SendIcon />}
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default QrInput;
