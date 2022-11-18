import React from "react";

function SettingsSelect({ icon, label, selectedOption, setSelectedOption }) {
    return (
        <div
            className={
                label.toLowerCase() === selectedOption
                    ? "SettingsSelect flex items-center mb-2 cursor-pointer border-l-4 border-black bg-slate-300"
                    : "SettingsSelect flex items-center mb-2 cursor-pointer border-white border-l-4 hover:border-black hover:bg-slate-300"
            }
            onClick={() => {
                setSelectedOption(label.toLowerCase());
            }}
        >
            <div className="icon py-2 px-3">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
}

export default SettingsSelect;
