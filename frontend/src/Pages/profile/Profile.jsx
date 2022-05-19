
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
//material UI 
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";

//react components import
 import{useLocation} from "react-router-dom";

import { Users } from '../../dummyData';

export default function Profile() {
          //get props from profile topbar page
           const location = useLocation();
           console.log("received propos are",location.state.user.email);


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
                          </div>

                          <div className="profileInfo">
                              <h4 className="profileInfoName"> My name</h4>
                              <span className="profileInfoDesc">My bio goes here</span>
                          </div>
                         
                      </div>
                      <div className="profileRightBottom">
                        <Feed/>
                        <Rightbar profile={"profile"}/>
                      </div>
                  </div>
             
            </div>
       </>
  );
}