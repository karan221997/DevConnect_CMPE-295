import React from "react";
import "./topbar.css";
import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function TopNavBar() {


  const navigate = useNavigate();

  const handleLogoutClick = (e) => {

    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }
  return (
    <div className="topbarContainer">
            <div className="topbarLeft"> 
                <span className="logo"> DevConnect</span>
            </div>   
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search  className="serachIcon"/>
                    <input  className="searchInput" placeholder="search for friends posts or videos" />
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

                <img src="/assets/person/1.jpg" alt="" className="topbarImg"/>
               
            </div>  
             <button onClick={handleLogoutClick}>
            Logout
          </button>    
        </div>
  );
}

export default TopNavBar;
