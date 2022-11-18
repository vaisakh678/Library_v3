import React from "react";
import { Stack, TextField } from "@mui/material";

function Search() {
    return (
        <div className="h-full contentWidth">
            <div className="contentTitle bg-slate-50fuck border-b-2 border-slate-200 px-4 flex items-center">
                Search
            </div>
            <div className="contentContainer flex justify-center items-center bg-slate-200">
                <Stack>
                    <TextField
                        id="standard-basic"
                        label="Year"
                        variant="standard"
                        size="small"
                        type="number"
                        sx={{ width: 80 }}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default Search;
