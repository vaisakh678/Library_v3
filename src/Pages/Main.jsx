import React, { useState } from "react";
import SidePanel from "../Components/SidePanel";
import Settings from "./Settings";

function Main() {
    const [selectedOption, setSelectedOption] = useState("dashboard");

    return (
        <div className="w-full h-full flex">
            <SidePanel
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {selectedOption === "settings" ? <Settings /> : null}
        </div>
    );
}

export default Main;
