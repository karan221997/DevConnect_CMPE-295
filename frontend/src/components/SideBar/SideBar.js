
import './sidebar.css'
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {Users} from "../../dummyData.js";
import Closedevelopers from '../closedevlopers/Closedevelopers';

export default function Sidebar() {
  return (
    <div className="sidebar">
       <div className="sidebarWrapper">
           <ul className="sidebarList">
              <li className="sidebarListItem">
                  <RssFeed className="sidebarIcon"/>
                  <span className="sidebarListItemtext">Feed</span>
              </li>
              <li className="sidebarListItem">
                  <PostAddIcon className="sidebarIcon"/>
                  <span className="sidebarListItemtext">Ask Questions</span>
              </li>
               <li className="sidebarListItem">
                  <Chat className="sidebarIcon"/>
                  <span className="sidebarListItemtext">Chats</span>
              </li>
              
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                <span className="sidebarListItemText">Communities</span>
              </li>
             
              <li className="sidebarListItem">
                <HelpOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Questions</span>
              </li>
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Jobs</span>
              </li>
                <li className="sidebarListItem">
                  <Event className="sidebarIcon" />
                  <span className="sidebarListItemText">Hackathons</span>
                </li>
                <li className="sidebarListItem">
                  <School className="sidebarIcon" />
                  <span className="sidebarListItemText">Learn</span>
                </li>
           </ul>
           <button className="sidebarButton">Show More</button>
              <hr className="sidebarHr" />
              <ul className="sidebarFriendList">
                  {Users.map((u) => ( <Closedevelopers key={u.id} user={u} /> ))}   
              </ul>       
       </div>
    </div>
  );
}