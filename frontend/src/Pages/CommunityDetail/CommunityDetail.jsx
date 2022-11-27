import React, { useEffect, useState } from "react";
import "./CommunityDetail.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CommunityFeed from "../../components/CommunityFeed/CommunityFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";

function CommunityDetail(props) {
  let commName = " ";
  commName = localStorage.getItem("communityName");
  const user = JSON.parse(localStorage.getItem("user"));
  const emailId = user.email;
  const [userCommunities, setUserCommunities] = useState([]);

  useEffect(() => {
    fetchUserCommunities(emailId);
  }, []);

  const fetchUserCommunities = async (emailId) => {
    try {
      console.log("User email in getUser Community API", emailId);
      const result = await axios.get(
        "api/communities/getCommunities/" + emailId
      );
      setUserCommunities(result.data[0].followers);
      console.log("UserCommunities", userCommunities);
    } catch (err) {
      console.log("cannot fetch user communities");
    }
  };
  return (
    <div>
      <Topbar />
      <div className="communityContainter">
        <Sidebar />
        <CommunityFeed communityName={commName} />
        <Rightbar profile={"community"} userCommunities={userCommunities} />
      </div>
    </div>
  );
}

export default CommunityDetail;
