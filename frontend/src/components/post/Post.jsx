import './post.css';
import {MoreVert} from '@mui/icons-material';
import { useState} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import { TextField } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Comment from '../comment/comment';

export default function Post({post}) {

const [viewAllComments, setViewAllComments] = useState(false);
const [commentButtonText, setCommentButtonText] = useState("View all comments");

const [numberofComments,setNumberofComments]=useState(post.comments.length);
const [comment, setComment] = useState(" ");

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

  const upvoted = async () => {
    const data ={
      postId  : post._id
    }

    try {
    const res = await axios.post("/api/posts/upvote", data);
      if(res.status === 200){
         window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  
  }

  const downvoted = async () => {
    console.log("downvoted");
     const data ={
      postId  : post._id
    }

    try {
   const res = await axios.post("/api/posts/downVote", data);
    if(res.status === 200){
         window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
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
                {/* Commenting this @Danesh -- please check if this is needed 
                <div>
                 {(post.image).map((imgSrc, index) => (<img src={imgSrc} key={index} className="postImg" alt="Make sure to include a alt tag, because react might throw an error at build"/>))} 
                 </div> */}
          </div>
          <div className="postBottom">
                <div className="postBottomLeft">
                    <ArrowDropUpIcon  htmlColor="#0066ff"    className="likeIcon" sx={{ fontSize: 40}} onClick={upvoted}/>
                    <span className='postLikeCounter'>{post.upVotes ? post.upVotes : 0}</span>
                    <ArrowDropDownIcon   htmlColor="#ff3300"  className="likeIcon" sx={{ fontSize: 40}} onClick={downvoted}/>
                     <span className="postLikeCounter"> {post.downVotes ? post.downVotes : 0} </span>     
                </div>
            <div className="postBottomRight">
                <span className="postCommentText"> {numberofComments} comments</span>
            </div>
            {numberofComments ? (
              <div className="postBottomRight">
                <span className="clickable_comment_text"
                onClick={() => {
                  setViewAllComments(!viewAllComments);
                  if (viewAllComments) {
                    setCommentButtonText("View all comments");
                  } else {
                    setCommentButtonText("Hide comments");
                  }
                }
                }
                > {commentButtonText} </span>
            </div>

            ) : (
              <div className="postBottomRight">
              </div>

            )}
            
          </div>

          <div className='inputComment'>
                <TextField fullWidth label="Add a comment" 
                InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="postProfileImg" />
                </InputAdornment>
              ),
            }}
            variant="standard" 
            onChange={(e) => setComment(e.target.value)}
            />
            <IconButton 
            onClick={() => {
              const user = JSON.parse(localStorage.getItem('user'));
              const data = {
                userId: user._id,
                commentCreatorEmail: user.email,
                commentCreatorUserName: user.userName,
                commentText: comment,
                postId: post._id,
              };
             
              axios.post("/api/posts/comment", data);
              window.location.reload();
            }}
            >
                <SendIcon />
            </IconButton> 
          </div>
          {viewAllComments ? (
            <div className="postComments">
              
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          ) : (
            <div className="postComments">
            </div>
          )}
        </div>
    </div>
  );     
}