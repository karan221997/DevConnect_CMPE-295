import { React, useState } from "react";
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
            {" "}
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
