import React, { useState, useEffect } from "react";
import LoginCover from "../assets/login-cover.jpg";
import Stack from "@mui/material/Stack";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
} from "@mui/material";

function Login() {
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) window.location = "/";
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location = "/";
        } else {
            setLoginError(true);
        }
    }

    return (
        <div className="Login w-full h-full bg-slate-100 flex justify-center items-center ">
            <div className="login-container flex shadow-2xl">
                <div className="cover bg-green-300 w-1/2 h-full">
                    <img
                        src={LoginCover}
                        alt="login-cover"
                        className="object-cover h-full"
                    />
                </div>
                <div className="login bg-slate-50 w-1/2 text-black p-10 pt-8">
                    <h1 className="text-4xl mb-20">Login</h1>

                    <form action="" onSubmit={handleLogin}>
                        <Stack className="flex flex-col" spacing={2}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={loginError ? true : false}
                            />
                            <TextField
                                size="small"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                label="password"
                                error={loginError ? true : false}
                            />
                            <FormControlLabel
                                value="end"
                                size="small"
                                control={<Checkbox size="small" />}
                                label="Remember password"
                                labelPlacement="end"
                            />
                            <Button
                                className="w-28"
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>

                            {loginError ? (
                                <Box
                                    sx={{ pt: 2 }}
                                    className="text-center text-sm flex-col w-full h-max flex text-red-600"
                                >
                                    <div>
                                        Sorry, your password was incorrect
                                    </div>
                                    <div>
                                        Please double-check your password.
                                    </div>
                                </Box>
                            ) : null}
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
