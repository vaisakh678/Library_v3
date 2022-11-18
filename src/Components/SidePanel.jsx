import React from "react";
import SidePanelSelect from "./SidePanelSelect";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

function SidePanel({ selectedOption, setSelectedOption }) {
    return (
        <div className="sidePanelWidth h-full border-r border-slate-300 bg-slate-100fuck p-4">
            <div className="list h-full flex flex-col justify-between">
                <div className="start">
                    <div className="icon bg-slate-300 w-full h-20 mb-4"></div>
                    <SidePanelSelect
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />

                    <SidePanelSelect
                        icon={<BarChartIcon />}
                        label="Statics"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />

                    <SidePanelSelect
                        icon={<SearchIcon />}
                        label="Search"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />

                    <SidePanelSelect
                        icon={<QrCodeScannerIcon />}
                        label="Scan"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />

                    <SidePanelSelect
                        icon={<SettingsIcon />}
                        label="Settings"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                </div>

                <div className="end">
                    <SidePanelSelect
                        icon={<LogoutIcon />}
                        label="Logout"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                </div>
            </div>
        </div>
    );
}

export default SidePanel;
