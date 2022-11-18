import React, { useState } from "react";
import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";

function Search() {
    const [type, setType] = useState("student");
    return (
        <div className="h-full contentWidth">
            <div className="contentTitle bg-slate-50fuck border-b-2 border-slate-200 px-4 flex items-center">
                Search
            </div>
            <div className="contentContainer flex justify-center p-4 items-center ">
                <div className="content-wrapper h-full w-full bg-slate-200">
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                Department
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                sx={{ width: 160 }}
                                id="demo-simple-select"
                                value={type}
                                label="Student Department"
                                size="small"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="mca">MCA</MenuItem>
                                <MenuItem value="int-mca">Int-MCA</MenuItem>
                                <MenuItem value="bfa">BFA</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="standard-basic"
                            label="Search"
                            variant="outlined"
                            size="small"
                            sx={{ width: 150 }}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ width: 100 }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Search;
