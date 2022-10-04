
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
//material UI 
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import {useContext, useState, useEffect, useReducer } from "react";
//react components import
import { useLocation } from "react-router-dom";
import { Route } from '@mui/icons-material';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


export default function Profile() {
  //get props from profile topbar page
  const location = useLocation();
  // we will be using this edit profile button to edit the profile
  const [isEdit, setIsEdit] = useState(false);
  //user of profile page
  const [user, setUser] = useState(location.state.user);
  //get user from local storage that is user that is logged in
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));

  const [addFriendButton, setAddFriendButton] = useState("");

  // const location = useLocation();
  const requester = JSON.parse(localStorage.getItem(true));
  //const [friend, setFriend] = useState(location.state.user);

  

  useEffect(() => {
    
    async function fetchData() {
      console.log("insde use effect for profile");
      await setUser(location.state.user);
      setUserData(JSON.parse(localStorage.getItem("user")));
      const currentuser = JSON.parse(localStorage.getItem("user"));
      console.log("current user", currentuser.following);
      console.log("user clicked ", user);
      if (user._id === currentuser._id) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
      
        const friendListofLoggedUser = await axios.get("api/users/getUserByEmail/"+ currentuser.email);
        //console.log(friendListofLoggedUser.data.user[0].following);

       const arrayLength = friendListofLoggedUser.data.user[0].following.length;
      var friendsArrayList = [];
        for(let i = 0; i < arrayLength; i++) {
          friendsArrayList.push(friendListofLoggedUser.data.user[0].following[i]);
       }
console.log(friendsArrayList);
       console.log(friendsArrayList.includes("h@gmail.com"));

      if(friendsArrayList.includes(user.email)){
        console.log("you are already frnds");
        setAddFriendButton("FRIENDS");
      }
      else{
        console.log("you are not friends");
        if (user.email==currentuser.email){
          console.log("same email");
          setAddFriendButton("SAME_EMAIL");
        }else{
          setAddFriendButton("NOT_FRIEND");
        }
        
      }
    }
    fetchData();

  }, [location.state.user]);

  const addFriend = async (e) => {
    e.preventDefault();
    const requester = JSON.parse(localStorage.getItem("user"));
    console.log("Requested by "+requester.email);
    //await setFriend(location.state.user);
    console.log("Requested to - "+user.email);
    console.log("click add friend");
    let data=
        {
           userId: requester.email
        }
        console.log(requester.email);

        console.log("friend profile "+user.email);

        
    try {
     const addFriend = await axios.put("api/users/"+ user.email +"/follow" , data);
      console.log(addFriend);
      setAddFriendButton("FRIENDS");
     } catch (err) {
       console.log(err);
     }

  }

  const removeFriend = async (e) => {
    e.preventDefault();
    const requester = JSON.parse(localStorage.getItem("user"));
    console.log("Requested by "+requester.email);
    //await setFriend(location.state.user);
    console.log("Requested to - "+user.email);
    console.log("click add friend");
    let data=
        {
           email: requester.email
        }
        console.log(requester.email);

        console.log("friend profile "+user.email);

        
    try {
     const removeFriend = await axios.put("api/users/"+ user.email +"/unfollow" , data);
      console.log(removeFriend);
      setAddFriendButton("NOT_FRIEND");
     } catch (err) {
       console.log(err);
     }

  }


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
              <h1><span className="profileInfoName">{user.userName}</span></h1>
              <span className="profileInfoDesc"> My bio goes here
                <span className="material-symbols-sharp editButtonBio">
                  {isEdit ? "drive_file_rename_outline" : ""}
                </span>
              </span>
              {/* {addFriendButton ? "":<button className='addFriend' onClick={addFriend}>
  Add Friend
</button>} */}
{(addFriendButton == 'SAME_EMAIL')?null:null }
{(addFriendButton == 'FRIENDS')?<button className='addFriend' onClick={removeFriend}>
  Remove Friend
</button>:null }
{(addFriendButton == 'NOT_FRIEND')?<button className='addFriend' onClick={addFriend}>
  Add Friend
</button>:null }
              {/* <button className='addFriend' onClick={addFriend}>
  Add Friend
</button> */}
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