import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
//material UI 
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import {useContext, useState, useEffect, useReducer } from "react";
//react components import
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { Edit, Route, Upload } from '@mui/icons-material';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { grey } from '@mui/material/colors';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { upload } from '@testing-library/user-event/dist/upload';

//creating theme to override material UI colors
const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#f44336',
    },
  },
});


export default function Profile() {
  //get props from profile topbar page
  const location = useLocation();
  // we will be using this edit profile button to edit the profile
  const [isEdit, setIsEdit] = useState(false);
  //user of profile page
  const [user, setUser] = useState(location.state.user);
  //get user from local storage that is user that is logged in
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
  const requester = JSON.parse(localStorage.getItem(true));
  const [profilePicture, setprofilePicture] = useState(location.state.user.profilePicture);


  useEffect(() => {
    
    async function fetchData() {
      await setUser(location.state.user);
      setUserData(JSON.parse(localStorage.getItem("user")));
      const currentuser = JSON.parse(localStorage.getItem("user"));
      if (user._id === currentuser._id) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }   
    }
    fetchData();

  }, [location.state.user,profilePicture]);

 const handleChageProfilePicture = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileName = file.name;
    const data = new FormData();
    data.append("image", file,fileName);

   const res = await axios.post('/api/posts/single-image-upload', data, {
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
     })
     if(res.status === 200){
      console.log("user is ",user);
      //set profile picture
      setprofilePicture(res.data.imageUrl);
      //updte the user
      const updatedUser = {
        ...user,
        profilePicture: res.data.imageUrl
      }
      //send the updated user to the backend
      const resultFromBackend = await axios.put(`/api/users/${user._id}`, updatedUser);
      if(resultFromBackend.status === 200){
      //update the user in local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      }

     }
  
 }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
         <ThemeProvider theme={theme}>
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="/assets/person/defaultCoverPicture.jpg" alt="" className="profileCoverImg" />
              <img src={profilePicture} alt="" className="profileUserImg" />
              <div className='editButtonCover'>
                  {isEdit && <IconButton>
                    <BorderColorIcon htmlColor='black'/>
                  </IconButton>}
              </div>
              <div className="editButtonProfile">
                  {isEdit && 
                  <IconButton
                   onClick={()=>{
                    document.getElementById("file").click();
                   }}
                  >
                   <input type="file" id="file" style={{display:"none"}}
                   accept=".png, .jpg, .jpeg"
                   multiple={false}
                    onChange={handleChageProfilePicture}
                   />
                    <BorderColorIcon htmlColor='black'/>
                  </IconButton>}
              </div>
            </div>
            <div className="profileInfo">
              <h1><span className="profileInfoName">{user.userName}</span></h1>
              <div className="profileInfoDesc"> 
                <span> My bio goes here </span>
                <div className="editButtonBio">
                  {isEdit && <IconButton>
                    <BorderColorIcon htmlColor='black'/>
                  </IconButton>}
                </div>
              </div> 
              <div>
                {isEdit && 
                <Button variant="contained" 
                color="primary"
                startIcon={<PersonAddIcon />}>
                  Add friend
                </Button>
               }   
              </div>  
            </div>

            
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile={"profile"} />
          </div>
          </ThemeProvider>
        </div>

      </div>
    </>
  );
}