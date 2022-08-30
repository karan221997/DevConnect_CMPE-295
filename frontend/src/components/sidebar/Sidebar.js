import "./sidebar.css";
import { React, useState } from "react";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { Button, Modal } from "react-bootstrap";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Users } from "../../dummyData.js";
import Closedevelopers from "../closedevlopers/Closedevelopers";
import CreatePost from "../CreatePost/CreatePost";
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => 
  {
  setShow(false);
  window.location.reload()
  
  }
  const handleShow = () => setShow(true);
  
  const HackathonsClickHandler = () => {
    navigate("/hackathon");
  };

  const ChatClickHandler = () => {
    navigate("/messenger");
  };

  const CommunitiesClickHandler = () => {
    navigate("/communities");
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemtext">Feed</span>
          </li>
          <li className="sidebarListItem">
            <PostAddIcon className="sidebarIcon" />
            <span className="sidebarListItemtext" onClick={handleShow}>
              Ask Questions
            </span>
          </li>
          <div className="modal-container">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <CreatePost />
              </Modal.Body>
            </Modal>
          </div>

          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemtext" onClick={ChatClickHandler}>Chats</span>
          </li>

          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText"onClick={CommunitiesClickHandler}>Communities</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText" onClick={HackathonsClickHandler}>Hackathons</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Learn</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Closedevelopers key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
