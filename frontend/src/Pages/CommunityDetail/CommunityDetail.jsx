import React from "react";
import "./CommunityDetail.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CommunityFeed from "../../components/CommunityFeed/CommunityFeed"
import Rightbar from "../../components/rightbar/Rightbar";
import { Button } from "react-bootstrap";

function CommunityDetail(props) {
  return (
    <div>
      <Topbar />
      <div className="communityContainter">
        <Sidebar />
        <CommunityFeed />
        <Rightbar profile={"community"} />
      </div>
    </div>
  );
}

export default CommunityDetail;
