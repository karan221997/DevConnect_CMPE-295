import React from "react";
import './post.css';
import {MoreVert} from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
// import {Users} from "../../dummyData.js";
import { useEffect, useState } from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";


export default function Post() {

    
  const [allPosts, setAllPosts] = React.useState([]);
  let responsePosts=[];
  // const location=useLocation();

  const getUserData=()=>
  {
    let userDetails=localStorage.getItem('user')
    let userObject=JSON.parse(userDetails)
    console.log("GOT USER EMAIL",userObject.email)
    let userEmail=userObject.email
    console.log("USER EMAIL",userEmail)
    
    return userEmail
  }

  useEffect(() => {
    
    console.log("Inside use effect")
    let email=getUserData();
    fetchData(email).then(()=>{

    });
    
    
    },[]); 

    const fetchData = (userEmail) => {
      
      let data=
        {
            email:userEmail,   
        }
      return new Promise((resolve,reject)=>{
        axios.post("api/posts/getAllPost",data).then((response) => {
              console.log('Got response data', response.data);  
              for(let i=0;i<response.data.length;i++){
                responsePosts[i]=response.data[i];
                // console.log(responsePosts[i]);
              }
              setAllPosts(responsePosts)
      })
    
          
      });
      
    }

    const createPostRow = (row, index) => {
      
      
      return (
        <div className="postWrapper">
        <div className="postTop">
              <div className="postTopLeft">
                  {/* <img src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="" className="postProfileImg" /> */}
                  <span className="postUsername">
                  {row.postCreatorUserName}
                  </span>
                  <AccessTimeIcon  htmlColor="grey" className="postInfoIcons"/>
                  {/* <span className="postDate">{post.date}</span> */}
                  <RoomIcon  htmlColor="grey" className="postInfoIcons"/>
                  <span className="postLocation">San Jose</span>
              </div>
              <div className="postTopRight">
                  <MoreVert />
              </div>
        </div>
        <br/>
        <div className="potCenter">
              <span className="postText">
                 {row.postText}
              </span>
              {/* <img src={post.photo} alt="" className="postImg" /> */}
              <br/>
              <br/>
        </div>
        <div className="postBottom">
              <div className="postBottomLeft">
                  <ThumbUpIcon  htmlColor="#0066ff" className="likeIcon"/>
                  <ThumbDownIcon   htmlColor="#ff3300" className="likeIcon"/>
                   <span className="postLikeCounter"> {row.upVotes} upvotes and {row.downVotes} downvotes </span>
         
              </div>
          <div className="postBottomRight">
                  {/* <span className="postCommentText"> {post.comments} comments</span> */}
          </div>
        </div>
      </div>

      );
  };



  return (
    <div className="post">
        {allPosts ? [allPosts.map(createPostRow)] : 'YOU HAVE NO POSTS CURRENTLY!'}
    </div>
  );
}