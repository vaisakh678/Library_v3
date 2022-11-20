import React, { useState } from "react";
import SidePanel from "../Components/SidePanel";
import Search from "./Search";
import Scan from "./Scan";
import Settings from "./Settings";

function Main() {
    const [selectedOption, setSelectedOption] = useState("dashboard");

    return (
        <div className="w-full h-full flex">
            <SidePanel
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {selectedOption === "search" ? <Search /> : null}
            {selectedOption === "scan" ? <Scan /> : null}
            {selectedOption === "settings" ? <Settings /> : null}
        </div>
    );
}

export default Main;
