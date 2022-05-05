
import "./onlineusers.css";


export default function Onlineusers({user}) {
  return (
             <li className="rightbarDevloper">
                  <div className="righbarProfileImageContainer">
                      <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
                      <span className="rightbarOnline"></span>
                  </div>
                  <span className="rightbarUsername">
                    {user.username}
                  </span>
            </li>
  );
}