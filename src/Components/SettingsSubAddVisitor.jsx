import React, { useState, useRef } from "react";
import {
    Stack,
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

function SettingsSubAddVisitor() {
    const firstName = useRef("");
    const secondName = useRef("");
    const registerNumber = useRef("");
    const [type, setType] = useState("student");
    const [department, setDepartment] = useState("mca");
    const year = useRef(0);

    async function handleRegister(e) {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:3001/api/register-visitor",
            {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    firstName: firstName.current.value,
                    secondName: secondName.current.value,
                    type,
                    department,
                    registerNumber: registerNumber.current.value,
                    year: year.current.value,
                }),
            }
        );
        const data = await response.json();
        if (data.status === "ok") {
            console.log(data);
        }
    }

    return (
        <form
            onSubmit={handleRegister}
            className="bg-slate-200fuck ml-4 h-full w-full"
        >
            <div className="text-2xl mb-4">Add Visitor</div>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        variant="standard"
                        size="small"
                        inputRef={firstName}
                        sx={{ width: 200 }}
                    />

                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        size="small"
                        inputRef={secondName}
                        sx={{ width: 200 }}
                    />
                </Stack>
                <TextField
                    id="standard-basic"
                    label="Register Number"
                    variant="standard"
                    size="small"
                    inputRef={registerNumber}
                    sx={{ width: 200 }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        sx={{ width: 120 }}
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        size="small"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                    </Select>
                </FormControl>
                {type === "student" ? (
                    <Stack spacing={1}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Student Department
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                sx={{ width: 160 }}
                                id="demo-simple-select"
                                value={department}
                                label="Student Department"
                                size="small"
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <MenuItem value="mca">MCA</MenuItem>
                                <MenuItem value="int-mca">Int-MCA</MenuItem>
                                <MenuItem value="bfa">BFA</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="standard-basic"
                            label="Year"
                            variant="standard"
                            size="small"
                            type="number"
                            inputRef={year}
                            sx={{ width: 80 }}
                        />
                    </Stack>
                ) : null}
                {type === "staff" ? (
                    <Stack>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Department
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                sx={{ width: 160 }}
                                id="demo-simple-select"
                                value={department}
                                label="Student Department"
                                size="small"
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <MenuItem value="mca">MCA</MenuItem>
                                <MenuItem value="int-mca">Int-MCA</MenuItem>
                                <MenuItem value="bfa">BFA</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                ) : null}
                <Button variant="contained" type="submit" sx={{ width: 100 }}>
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default SettingsSubAddVisitor;
