import React from "react";
import "./CreatePost.css";
import { Button, ButtonGroup } from "react-bootstrap";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { textAlign } from "@mui/system";

function CreatePost(props) {
  const [type, setType] = React.useState("text");
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
              >
                <option selected disabled>
                  Select Community
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
                <button className="btnCreatePost">
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
                      ></input>
                      <textarea
                        id="w3review"
                        className="form-control"
                        rows="4"
                        cols="50"
                        placeholder="Enter Question "
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
