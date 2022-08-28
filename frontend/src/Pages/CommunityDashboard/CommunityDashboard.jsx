import React from "react";
import TopBar from "../../components/topbar/Topbar";
import RightBar from "../../components/rightbar/Rightbar";
import SideBar from "../../components/sidebar/Sidebar";
import CommunityTile from "../../components/CommunityTile/CommunityTile";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import ExploreTwoToneIcon from "@mui/icons-material/ExploreTwoTone";
import "./CommunityDashboard.css";
import { Button } from "react-bootstrap";

function CommunityDashboard() {
  return (
    <div>
      <TopBar />
      <div className="CommunityDashboard">
        <SideBar />
        <div className="CommunityDashboard_Right">
          <h4 style={{ float: "left", marginLeft: "20px" }}>
            {" "}
            <ExploreTwoToneIcon /> &nbsp;Explore Developer Communities
          </h4>
          <Button className="CreateNew" variant="outline-dark" size="sm">
            <AddCircleTwoToneIcon /> &nbsp;Create Community
          </Button>
          <CommunityTile variant={"outline-dark"} />
          <CommunityTile variant={"outline-warning"} />
          <CommunityTile variant={"outline-success"} />
        </div>
        <RightBar profile={"profile"} />
      </div>
    </div>
  );
}

export default CommunityDashboard;
