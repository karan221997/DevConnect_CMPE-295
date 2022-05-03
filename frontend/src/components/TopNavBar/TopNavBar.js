import React from "react";
import "./TopNavBar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  HomeRounded,
} from "@mui/icons-material";
function TopNavBar() {
  return (
    <div>
      <div id="topbarContainer" className="topbarContainer">
        <img
          className="logo-img"
          src="https://cdn.dribbble.com/users/1708950/screenshots/4188877/developer_med.gif"
        ></img>
        <div className="topbarLeft">
          <span className="logo">DevConnect</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for QnA and Communities"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          {/* <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div> */}
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <HomeRounded />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
            alt="avatar1"
            className="topbarImg"
          />
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
