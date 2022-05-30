
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
//material UI 
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useState, useEffect, useReducer } from "react";
//react components import
import { useLocation } from "react-router-dom";
import { Route } from '@mui/icons-material';


export default function Profile() {
  //get props from profile topbar page
  const location = useLocation();
  // we will be using this edit profile button to edit the profile
  const [isEdit, setIsEdit] = useState(false);
  //user of profile page
  const [user, setUser] = useState(location.state.user);
  //get user from local storage that is user that is logged in
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    async function fetchData() {
      console.log("insde use effect for profile");
      await setUser(location.state.user);
      setUserData(JSON.parse(localStorage.getItem("user")));
      const currentuser = JSON.parse(localStorage.getItem("user"));
      console.log("current user", currentuser.userName);
      console.log("user clicked ", user.userName);
      if (user._id === currentuser._id) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }
    fetchData();

  }, [location.state.user]);


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="/assets/person/defaultCoverPicture.jpg" alt="" className="profileCoverImg" />
              <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="profileUserImg" />
              <span className="material-symbols-sharp editButtonCover ">
                {isEdit ? "drive_file_rename_outline" : ""}
              </span>
              <span className="material-symbols-sharp editButtonProfile">
                {isEdit ? "drive_file_rename_outline" : ""}
              </span>
            </div>
            <div className="profileInfo">
              <span className="profileInfoName">{user.userName}</span>
              <span className="profileInfoDesc"> My bio goes here
                <span className="material-symbols-sharp editButtonBio">
                  {isEdit ? "drive_file_rename_outline" : ""}
                </span>
              </span>
            </div>

          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile={"profile"} />
          </div>
        </div>

      </div>
    </>
  );
}