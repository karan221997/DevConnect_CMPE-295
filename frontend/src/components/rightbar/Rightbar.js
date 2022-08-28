import WorkIcon from '@mui/icons-material/Work';
import './rightbar.css';
import {Users} from "../../dummyData.js";
import Onlineusers from '../onlineusers/Onlineusers';
import Addvertisement from '../addvertisement/Addvertisement';
import {Room} from '@mui/icons-material';
export default function Rightbar({profile}) {

  
  const HomeRightbar = () => {

    return (
      <> 
      <div className="topjobpostContainer">
              <WorkIcon  htmlColor="#0066ff"  className="jobpostImg" />
              <span className="jobpostText">
                <b>Meta</b> and <b>3 other </b> companies posted job today.
              </span>
       </div>
            <div className="addvertisementSection">
              <Addvertisement />
            </div>
          <span className="rightbarTittle">Online Developer Friends</span>
          <ul className="rightbarDeveloperList">
            {Users.map((u) => ( <Onlineusers key={u.id} user={u} /> ))}        
          </ul>
      </>
    );
  }

  const ProfileRightbar = () => {
    return (
      <>
      <h4 className="rightbarTittle"> User Information</h4>
      <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Areas of Expertise :</span>
                <span className="rightbarInfoValue">C++, java, React</span>
            </div>
             <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Location :</span>
                <span className="rightbarInfoValue"><Room className="rightbarInfoValueIcon"/>New york</span>
            </div>
             <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Help Required In :</span>
                <span className="rightbarInfoValue">React Native</span>
            </div>
      </div>
       <h4 className="rightbarTittle"> Communities </h4>
           <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="https://cdn.vox-cdn.com/thumbor/_AobZZDt_RVStktVR7mUZpBkovc=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/assets/1087137/java_logo_640.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName"><b>Java</b></span>
                </div>
                <div className="rightbarFollowing">
                    <img src="https://miro.medium.com/max/722/1*WzqoTtRUpmJR26dzlKdIwg.png" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName"><b>MySQL</b></span>
                </div>
                <div className="rightbarFollowing">
                    <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName"><b>HTML</b></span>
                </div>
                <div className="rightbarFollowing">
                    <img src="https://toppng.com//public/uploads/preview/bootstrap-social-media-icons-html-css-js-logo-11563293145uql7yehdq3.png" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName"><b>CSS</b></span>
                </div>
                 {/* <div className="rightbarFollowing">
                    <img src="/assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Stanly Hudson</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/7.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Angela Martin</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/8.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Kevin Melon</span>
                </div>
                 <div className="rightbarFollowing">
                    <img src="/assets/person/9.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Rayan Millers</span>
                </div> */}
           </div>
            <Addvertisement/>
      </>
    );
  }
  return (
    <div className="rightbar">
       <div className="rightbarWrapper">
         {profile === "home" ? <HomeRightbar /> : <ProfileRightbar />}
       </div>
    </div>
  );
}
