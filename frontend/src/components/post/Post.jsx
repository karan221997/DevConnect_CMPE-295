import './post.css';
import {MoreVert} from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import {Users} from "../../dummyData.js";


export default function Post({post}) {



  return (
    <div className="post">
        <div className="postWrapper">
          <div className="postTop">
                <div className="postTopLeft">
                    <img src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="" className="postProfileImg" />
                    <span className="postUsername">
                    {Users.filter((u) => u.id === post.userId)[0].username}
                    </span>
                    <AccessTimeIcon  htmlColor="grey" className="postInfoIcons"/>
                    <span className="postDate">{post.date}</span>
                    <RoomIcon  htmlColor="grey" className="postInfoIcons"/>
                    <span className="postLocation">San Jose</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
          </div>
          <div className="potCenter">
                <span className="postText">
                   {post?.desc}
                </span>
                <img src={post.photo} alt="" className="postImg" />
          </div>
          <div className="postBottom">
                <div className="postBottomLeft">
                    <ThumbUpIcon  htmlColor="#0066ff" className="likeIcon"/>
                    <ThumbDownIcon   htmlColor="#ff3300" className="likeIcon"/>
                     <span className="postLikeCounter"> {post.like} upvotes and 2 downvote </span>
           
                </div>
            <div className="postBottomRight">
                    <span className="postCommentText"> {post.comments} comments</span>
            </div>
          </div>
        </div>
    </div>
  );
}