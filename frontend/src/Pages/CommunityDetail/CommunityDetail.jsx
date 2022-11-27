import React from "react";
import "./CommunityDetail.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CommunityFeed from "../../components/CommunityFeed/CommunityFeed";
import Rightbar from "../../components/rightbar/Rightbar";

function CommunityDetail(props) {
  let commName = " ";
  commName = localStorage.getItem("communityName");
  const user = JSON.parse(localStorage.getItem("user"));
  const emailId = user.email;
  return (
    <div>
      <Topbar />
      <div className="communityContainter">
        <Sidebar />
        <CommunityFeed communityName={commName} />
        <Rightbar profile={"community"} />
      </div>
    </div>
  );
}

export default CommunityDetail;
