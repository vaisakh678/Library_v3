import React from "react";

function SidePanelSelect({
    icon,
    label,
    selectedOption,
    setSelectedOption,
    fire,
}) {
    return (
        <div
            className={
                label.toLowerCase() === selectedOption.toLowerCase()
                    ? "option flex mb-2 items-center cursor-pointer bg-slate-300 rounded"
                    : "option flex mb-2 items-center cursor-pointer hover:bg-slate-300 rounded"
            }
            onClick={() => {
                if (fire) {
                    fire();
                } else {
                    setSelectedOption(label.toLowerCase());
                }
            }}
        >
            <div className="icon px-3 py-2">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
}

export default SidePanelSelect;
