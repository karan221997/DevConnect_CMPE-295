import React from "react";
import "./Dashboard.css";
import TopNavBar from "../TopNavBar/TopNavBar";
import SideBar from "../SideBar/SideBar";
import Feed from "../Feed/Feed";
import RightBar from "../RightBar/RightBar";

function Dashboard(props) {
  return (
    <div>
      <TopNavBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
}

export default Dashboard;
