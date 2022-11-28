import React from "react";
import "./CreatePost.css";
import {  ButtonGroup } from "react-bootstrap";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';


function CreatePost(props) {
  const [Communities, setCommunities] = useState([]);
  const [type, setType] = React.useState("text");
  const [postTitle, setPostTitle] = React.useState("");
  const [postText, setPostText] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [selectedCommunity, setSelectedCommunity] = React.useState("");
  const [communityId] = React.useState(0);
  const navigate = useNavigate();
  const [ show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [countOfFiles, setCountOfFiles] = React.useState(0);
  const [generatedURLS, setGeneratedURLS] = React.useState([]);
  const inputRef = useRef(null);


  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  
  async function handleFileUpload  (event) {
    event.preventDefault();
    setFiles(event.target.files);
    let tempFiles = event.target.files;
    let count = 0;
    for(let i=0;i<tempFiles.length;i++)
    {
      count+=1;
    }
    await setCountOfFiles(count);
    
  };

  const multipleFileUploadHandler = async () => {
    
    const data = new FormData();
    let selectedFiles = files;// If file selected
    if ( selectedFiles ) {
     for ( let i = 0; i < selectedFiles.length; i++ ) {
      data.append( 'image', selectedFiles[ i ], selectedFiles[ i ].name );
     }
     console.log("data to backend is ",data);
     await axios.post('/api/posts/multi-image-upload', data, {
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
     })
      .then( async ( response ) => {
        if(response.status === 200)
        {
          let urls=[]
          for (let i=0; i<response.data.length; i++)
          {
            urls.push(response.data[i].imageUrl);

          }
          setGeneratedURLS(urls);
          if(urls.length>1)
          {
            alert("Your images are uploaded successfully!")
          }
          else if(urls.length === 0)
          {
            alert("Select an image to upload")
          }
          else
          {
            alert("Image uploaded successfully!")
          }
        }
        else
        {
          console.log("Error Uploading images",response.data.error)
        }
  })
  }
}


  useEffect(() => {
    let userDetails = localStorage.getItem("user");
    let userObject = JSON.parse(userDetails);
    //get all communities from backed
    const getCommunities = async () => {
      const communitiesFromServer = await axios.get("/api/communities/getAllCommunities");
      setCommunities(communitiesFromServer.data);
    };
    getCommunities();
    setUserId(userObject._id);
    setUserName(userObject.userName);
    setUserEmail(userObject.email);
  }, [Communities]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    console.log("inside add post clicked ", postTitle);
    let Urls=[]
    console.log("Checking if there is something in URL",generatedURLS.length)
    for(let i=0;i<generatedURLS.length;i++)
    {
      Urls.push(generatedURLS[i]);
    }
    let data = {
      userId: userId,
      userName: userName,
      email: userEmail,
      title: postTitle,
      text: postText,
      communityName: selectedCommunity,
      communityId: communityId,
      S3URL: Urls
    };
    try {
      const response = await axios.post("/api/posts/addPost", data);
     
    } catch (err) {
      console.log(err);
    }
    handleClose();
    navigate("/dashboard");
  };

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
                  setSelectedCommunity(event.target.value);
                }}
               
              >
                <option value="" disabled selected>
                  Select Community
                </option>
              {Communities.map((community) => (
                <option value={community.communityName}>{community.communityName}</option>
              ))}
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
                <button
                  className="btnCreatePost"
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    setType("text");
                  }}
                >
                  <TextSnippetOutlinedIcon htmlColor="white" />
                  Post
                </button>
                <input
                  multiple
                  style={{display: 'none'}}
                  ref={inputRef}
                  type="file"
                  // onChange={handleFileUpload}
                />
                {/* <button className="btnCreatePost" onClick={handleClick}> */}
              <button className="btnCreatePost"
                onClick={() => {
                    setType("image");
                  }}>
                  <LinkOutlinedIcon htmlColor="white" />
                  Images
                </button>
                <button
                  className="btnCreatePost"
                  onClick={() => {
                    setType("url");
                  }}
                >
                  <AddPhotoAlternateOutlinedIcon htmlColor="white" />
                  Links
                </button>
              </ButtonGroup>
              <center>{(countOfFiles == 0) ? "" : "No. of images selected: "+countOfFiles}</center>
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
                        placeholder="Enter your Question"
                        onChange={(e) => {
                          setPostTitle(e.target.value);
                        }}
                      ></input>
                      <div
                        className="from-control"
                        style={{
                          border: "1px solid #ccc",
                          marginTop: "5px",
                          marginBottom: "5px",
                          overflow: "hidden",
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
                          onChange={handleFileUpload}
                        ></input>
                        <button className="rounded-pill" onClick={multipleFileUploadHandler}>Upload</button>
                      </div>
                      <div className="center">
                        {/* {console.log(this.state.selectedFile)} */}
                        {/* <img
                          src="https://www.ajoure-men.de/wp-content/uploads/2020/12/Reddit-Titelbild.jpg"
                          alt=""
                          id="img"
                          className="img"
                        /> */}
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
