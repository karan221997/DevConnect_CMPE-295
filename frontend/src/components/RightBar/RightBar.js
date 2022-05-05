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
            <Addvertisement/>
          <h4 className="rightbarTittle">Online Devloper Friends</h4>
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
                <span className="rightbarInfoKey">Expert In :</span>
                <span className="rightbarInfoValue">c++, java, React</span>
            </div>
             <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">location :</span>
                <span className="rightbarInfoValue"><Room classname="rightbarInfoValueIcon"/>New york</span>
            </div>
             <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">looking for :</span>
                <span className="rightbarInfoValue">c++ devlopers</span>
            </div>
      </div>
       <h4 className="rightbarTittle"> User followings</h4>
           <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="/assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Pam Beasly</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/3.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Jim Halpert</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Andy Bernard</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/5.jpg" alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Dwight Schrute</span>
                </div>
                 <div className="rightbarFollowing">
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
                </div>
           </div>
            <Addvertisement/>
      </>
    );
  }
  return (
    <div className="rightbar">
       <div className="rightbarWrapper">
          <HomeRightbar />
       </div>
    </div>
  );
}