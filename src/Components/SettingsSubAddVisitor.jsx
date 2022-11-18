import React, { useState } from "react";
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [type, setType] = useState("student");
    const [studentDept, setStudentDept] = useState("mca");
    return (
        <div className="bg-slate-200fuck ml-4 h-full w-full">
            <div className="text-2xl mb-4">Add Visitor</div>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        variant="standard"
                        size="small"
                        sx={{ width: 200 }}
                    />

                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        size="small"
                        sx={{ width: 200 }}
                    />
                </Stack>
                <TextField
                    id="standard-basic"
                    label="Register Number"
                    variant="standard"
                    size="small"
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
                                value={studentDept}
                                label="Student Department"
                                size="small"
                                onChange={(e) => setStudentDept(e.target.value)}
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
                                value={studentDept}
                                label="Student Department"
                                size="small"
                                onChange={(e) => setStudentDept(e.target.value)}
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
        </div>
    );
}

export default SettingsSubAddVisitor;
