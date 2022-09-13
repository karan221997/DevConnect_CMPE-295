import React from "react";
import "./CreatePost.css";
import { Button, ButtonGroup } from "react-bootstrap";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { textAlign } from "@mui/system";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {  Modal } from "react-bootstrap";
import {useRef} from 'react';

function CreatePost(props) {
  const [type, setType] = React.useState("text");
  const [postTitle, setPostTitle] = React.useState('');
  const [postText, setPostText] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [selectedCommunity, setSelectedCommunity] = React.useState('');
  const [communityId, setCommunityId] = React.useState(0);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState('');
  const inputRef = useRef(null);

  const handleClose = () => 
  {
  setShow(false);
  window.location.reload()
  }

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  
  const handleFileUpload = event => {
    event.preventDefault();
    setFiles(event.target.files);
    const bodyFormData = new FormData();
    console.log("File details should come here",event.target.files);
    
  };




  useEffect(() => {
    let userDetails=localStorage.getItem('user')
    let userObject=JSON.parse(userDetails)
    
    setUserId(userObject._id)
    setUserName(userObject.userName)
    setUserEmail(userObject.email)
    
    }, []); 

  const handleAddPost = async (e) => {
    
    let data=
        {
            userId:userId,
            userName:userName,
            email:userEmail,
            title:postTitle,
            text:postText,
            communityName:selectedCommunity,
            communityId:communityId
        }
        try {
        const response=await axios.post("/api/posts/addPost", data);
        console.log("ADDED POPS")
       } catch (err) {
         console.log(err);
       }
       handleClose();
       navigate("/dashboard");

    }


  return (
    <div>
      <div className="container">
        <div className="row">
          <hr />
          <div className="create-post-container col-md-12">
            <div className="form-group">
              <div className="create-post-heading">Ask Your Question</div>
              <hr />
              <select
                className="form-control"
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onChange={(event, newValue) => {
                  setSelectedCommunity(event.target.value)
                  console.log(event.target.value)
              }}
              >
                <option selected disabled>
                  Select Community
                </option>
                <option value="ReactJS" id="1">
                  ReactJS
                </option>
                <option value="NodeJS" id="2">
                  NodeJS
                </option>
                <option value="Java" id="3">
                  Java
                </option>
              </select>
              <hr />
              <ButtonGroup
                className="form-control"
                style={{
                  padding: "0px 0px",
                  flex: 1,
                  border: "1px solid #0000",
                  color: "#000000",
                }}
              >
                <button className="btnCreatePost" style={{ marginLeft: "5px" }}>
                  <TextSnippetOutlinedIcon htmlColor="white" />
                  Post
                </button>
                <input
                  multiple
                  style={{display: 'none'}}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileUpload}
                />
                <button className="btnCreatePost" onClick={handleClick}>
                  <LinkOutlinedIcon htmlColor="white" />
                  Images
                </button>
                <button className="btnCreatePost">
                  <AddPhotoAlternateOutlinedIcon htmlColor="white" />
                  Links
                </button>
              </ButtonGroup>
              <hr />

              {(function () {
                if (type === "url") {
                  return (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="Title"
                      ></input>
                      <input
                        type="url"
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="URL"
                      
                      ></input>
                    </div>
                  );
                } else if (type === "text") {
                  return (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        style={{ marginTop: "5px", marginBottom: "10px" }}
                        placeholder="Title"
                        onChange={(e) => {
                          setPostTitle(e.target.value);
                      }}
                      ></input>
                      <textarea
                        id="w3review"
                        className="form-control"
                        rows="4"
                        cols="50"
                        placeholder="Enter Question "
                        onChange={(e) => {
                          setPostText(e.target.value);
                      }}
                      ></textarea>
                    </div>
                  );
                } else if (type === "image") {
                  return (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        style={{ marginTop: "5px" }}
                        placeholder="Title"
                      ></input>
                      <div
                        className="from-control"
                        style={{
                          border: "1px solid #ccc",
                          marginTop: "5px",
                          marginBottom: "5px",
                          overflow: "hidden",
                          backgroundColor: "#000000",
                          color: "#878a8c",
                          position: "relative",
                          borderRadius: "4px",
                          padding: "5px",
                          flex: 1,
                        }}
                      >
                        <input
                          type="file"
                          id="file"
                          accept=".png, .jpg, .jpeg"
                          multiple
                        ></input>
                        <button className="rounded-pill">Upload</button>
                      </div>
                      <div className="center">
                        {/* {console.log(this.state.selectedFile)} */}
                        <img
                          src="https://www.ajoure-men.de/wp-content/uploads/2020/12/Reddit-Titelbild.jpg"
                          alt=""
                          id="img"
                          className="img"
                        />
                      </div>
                    </div>
                  );
                }
              })()}

              <span>
                <div style={{ marginTop: "5px" }} className="float-right">
                  <button
                    className="btnCreatePost"
                    style={{ textAlign: "center" }}
                    onClick={handleAddPost}
                  >
                    <HelpCenterOutlinedIcon htmlColor="white" />
                    Post Question
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
