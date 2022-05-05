import './closedevelopers.css';
import {Users} from "../../dummyData.js";

export default function Closedevelopers({user}) {
  return (
                 <li className="sidebarFriend">
                      <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
                      <span className="sidebarFriendName">{user.username}</span>
                  </li>
  );
}