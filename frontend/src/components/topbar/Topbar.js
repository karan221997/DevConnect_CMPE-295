//import css
import "./topbar.css";
//react imports
import React from "react";
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//material UI icons
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
//material UI components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function TopNavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleClose();
    localStorage.clear();
    navigate("/");
    window.location.reload();

  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logoText"> DevConnect</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="serachIcon" />
          <input className="searchInput" placeholder="search for friends posts or videos" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>

        </div>
        <img src="/assets/person/1.jpg" alt="" className="topbarImg"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
         />
         <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
         >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default TopNavBar;
