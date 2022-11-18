import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/error" element={<Error404 />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
