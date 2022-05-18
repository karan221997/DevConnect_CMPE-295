
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
export default function Profile() {
  return (
     <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                  <div className="profileRight">
                      <div className="profileRightTop">
                          <div className="profileCover">
                            <img src="/assets/post/9.jpg" alt="" className="profileCoverImg" />
                            <img src="/assets/person/1.jpg" alt="" className="profileUserImg" />
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