import { React, useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/Topbar";
import RightBar from "../../components/rightbar/Rightbar";
import SideBar from "../../components/sidebar/Sidebar";
import CommunityTile from "../../components/CommunityTile/CommunityTile";
import CreateCommunity from "../../components/CreateCommunity/CreateCommunity";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import ExploreTwoToneIcon from "@mui/icons-material/ExploreTwoTone";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";

import "./CommunityDashboard.css";
import { Button, Modal } from "react-bootstrap";

function CommunityDashboard() {
  const [show, setShow] = useState(false);
  const [arr, setArr] = useState([]);
  // const [userId, setUserId] = React.useState("userID");
  // const [userName, setUserName] = React.useState("userName");
  const [userEmail, setUserEmail] = useState("");
  const [communitiesData, setCommunitiesData] = useState([]);
  const [userCommunities, setUserCommunities] = useState([""]);
  const pageCount = 1;
  const entries = 5;

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    console.log("Use effect is being called");
    console.log(userDetails);
    fetchCommunities();
    fetchUserCommunities(userDetails.email);
  }, []);

  const fetchCommunities = async () => {
    try {
      const result = await axios.post("api/communities/getAllCommunities", {
        page: pageCount,
        limit: entries,
      });
      console.log("Fetch communities result", result.data);
      setCommunitiesData(result.data);
    } catch (err) {
      console.log("Unable to fetch communities");
    }
  };

  const fetchUserCommunities = async (emailId) => {
    try {
      console.log("User email in getUser Community API", emailId);
      const result = await axios.get(
        "api/communities/getCommunities/" + emailId
      );
      setUserCommunities(result.data[0].followers);
    } catch (err) {
      console.log("cannot fetch user communities");
    }
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div>
      <TopBar />
      <div className="CommunityDashboard">
        <SideBar />
        <div className="CommunityDashboard_Right">
          <h4 style={{ float: "left", marginLeft: "20px" }}>
            <ExploreTwoToneIcon /> &nbsp;Explore Developer Communities
          </h4>
          <Button
            className="CreateNew"
            variant="outline-dark"
            size="sm"
            onClick={handleShow}
          >
            <AddCircleTwoToneIcon /> &nbsp;Create Community
          </Button>
          <div className="modal-container">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header
                closeButton
                style={{ background: "black", color: "white" }}
              >
                <Diversity3OutlinedIcon />
                &nbsp;
                <b>Create your Community !! </b>
              </Modal.Header>
              <Modal.Body>
                <CreateCommunity />
              </Modal.Body>
            </Modal>
          </div>
          {communitiesData.map((community) => (
            <CommunityTile
              variant="outline-dark"
              key={community._id}
              community={community}
            />
          ))}
        </div>
        <RightBar
          profile={"profile"}
          userCommunities={userCommunities}
        />
      </div>
    </div>
  );
}

export default CommunityDashboard;
