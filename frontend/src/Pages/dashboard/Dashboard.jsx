import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./dashboard.css";
export default function Dashboard() {
    return (
        <>
            <Topbar />
            <div className="dashboardContainter">
                <Sidebar />
                <Feed/>
                <Rightbar/>
            </div>
        </>
    );
}
