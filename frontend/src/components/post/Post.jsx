import './post.css';
import {MoreVert} from '@mui/icons-material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import {Users} from "../../dummyData.js";


export default function Post({post}) {
const timeElasped = new Date(post.createdAt).getTime() - new Date().getTime();
const timeElaspedInMinutes = timeElasped / 60000;
const timeElaspedInMinutesRounded = Math.round(timeElaspedInMinutes)*-1;
//round to nearest minute and take modulus of 60 to get seconds
const timeElaspedInSeconds = Math.round(timeElaspedInMinutes % 60) ;
//round to nearest minute and take modulus of 60 to get minutes
const timeElaspedInSecondsRounded = Math.round(timeElaspedInMinutesRounded % 60)*-1;

const timeElaspedInHours = timeElaspedInMinutes / 60;
//round to nearest hour
const timeElaspedInHoursRounded = Math.round(timeElaspedInHours)*-1;
//round to nearest day
const timeElaspedInDays = timeElaspedInHours / 24;
const timeElaspedInDaysRounded = Math.round(timeElaspedInDays)*-1;
//round to nearest week
const timeElaspedInWeeks = timeElaspedInDays / 7;
const timeElaspedInWeeksRounded = Math.round(timeElaspedInWeeks)*-1;

let timeToDisplay = "";
if (timeElaspedInWeeksRounded > 0) {
  timeToDisplay = timeElaspedInWeeksRounded + " weeks ago";
} else if (timeElaspedInDaysRounded > 0) {
  timeToDisplay = timeElaspedInDaysRounded + " days ago";
} else if (timeElaspedInHoursRounded > 0) {
  timeToDisplay = timeElaspedInHoursRounded + " hours ago";
} else if (timeElaspedInMinutesRounded > 0) {
  timeToDisplay = timeElaspedInMinutesRounded + " minutes ago";
} else {
  timeToDisplay = timeElaspedInSecondsRounded + " seconds ago";
}


  return (
    <div className="post">
        <div className="postWrapper">
          <div className="postTop">
                <div className="postTopLeft">
                    <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="postProfileImg" />
                    <span className="postUsername">
                    {post.postCreatorUserName}
                    </span>
                    <AccessTimeIcon  htmlColor="grey" className="postInfoIcons"/>
                    <span className="postDate">{timeToDisplay}</span>
                    <RoomIcon  htmlColor="grey" className="postInfoIcons"/>
                    <span className="postLocation">San Jose</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
          </div>
          <div className="postCenter">
                <span className="postTittle">
                    <h5>{post.postTitle}</h5>
                </span>
                <span className="postText">
                   {post.postText}
                </span>
                {/* <img src={post.image[0]} alt="" className="postImg" /> */}
                <div>
                 {(post.image).map((imgSrc, index) => (<img src={imgSrc} key={index} className="postImg" alt="Make sure to include a alt tag, because react might throw an error at build"/>))} 
                 </div>
          </div>
          <div className="postBottom">
                <div className="postBottomLeft">
                    <ArrowDropUpIcon  htmlColor="#0066ff"    className="likeIcon" sx={{ fontSize: 40}}/>
                    <ArrowDropDownIcon   htmlColor="#ff3300"  className="likeIcon" sx={{ fontSize: 40}}/>
                     <span className="postLikeCounter"> {post.upVotes} upvotes and {post.DownVote ? post.DownVote : 0} downvote </span>     
                </div>
            <div className="postBottomRight">
                <span className="postCommentText"> {post.commentCount ? post.commentCount : 0} comments</span>
            </div>
          </div>
        </div>
    </div>
  );
}