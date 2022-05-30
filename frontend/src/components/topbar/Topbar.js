//import css
import "./topbar.css";
//react imports
import React from "react";
import axios from "axios";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//material UI icons
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
//material UI components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Usersearch from "../usersearch/Usersearch";

//creating theme to override material UI colors
const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: red[500],
    },
  },
});



function TopNavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [searchPopper, setSearchPopper] = useState(false);
  const [searchText, setSearchText] = useState(" ");


  useEffect(() => {
    async function fetchUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserName(user.userName);
      const result = await axios.get("api/users/");
      //filter the information of self
       const Allusers = result.data.users;
      const userdata = Allusers.filter(values => values.email !== user.email);
      setUserdata(userdata);
    }
    fetchUser();
  }, []);



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

  const handleProfileClick = (e) => {
    e.preventDefault();
    //make the value in serach bar empty
    handleClose();

    //sending user to profile page
    //get user from local storrge
    const user = JSON.parse(localStorage.getItem('user'));
    navigate("/profile", { state: { user } });
  }

  const handleHomepageClick = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPopper(!searchPopper);
  }


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logoText"> DevConnect</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="serachIcon" />
          <ThemeProvider theme={theme}>
            <Autocomplete
              freeSolo
              open={searchPopper}
              sx={{ width: '100%' }}
              autoHighlight
              options={userdata}
              getOptionLabel={(option) => option.userName}
              renderOption={(props, option) => (
                <Usersearch key={option.email} user={option} setSearchPopper={setSearchPopper} setSearchText={setSearchText} />
              )}
              renderInput={(params) => <TextField {...params}
                fullWidth
                value={searchText}
                sx={{
                  width: '100%',
                  fontFamily: 'Roboto',
                  fontSize: '4px',
                  fontWeight: '500',
                }}
                
                variant="standard"
                placeholder="Search for Developers or Communities"
                onChange={handleSearch}

              />}
            />
          </ThemeProvider>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={handleHomepageClick}>Homepage</span>
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
        <span className="topbarUsername">{userName}</span>
        <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="topbarImg"
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
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default TopNavBar;
