import { React, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button, Row, Container, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import QuickreplyTwoToneIcon from "@mui/icons-material/QuickreplyTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./CommunityTile.css";
function CommunityTile({ community }) {
  const navigate = useNavigate();
  const [success, setSuccessful] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const email = userDetails.email;

  // const CommunityClickHandler = (communityID) => {
  //   navigate(`/communityDetail/${communityID}`);
  // };

  const LinkClickHandler = () => {
    localStorage.setItem("communityName", community.communityName);
    navigate("/communitydetail");
  };
  const JoinCommunityHandler = async () => {
    try {
      const result = await axios.post("api/communities/joinCommunity", {
        communityId: community._id,
        email: email,
        communityName: community.communityName,
      });

      if (result) {
        console.log("idhar in front", result.message);
        setSuccessful(true);
      }
    } catch (err) {
      {
        <Alert key="warning" variant="warning">
          Unable to join community, user is already part of community
        </Alert>;
      }
    }
  };

  return (
    <div>
      <div className="CardContainer">
        <Container>
          <Card>
            <Card.Header>
              <i>
                <div className="CommunityHeader">
                  <div className="middleInfo">
                    <GroupOutlinedIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">
                      {community.numberOfMembers}
                    </span>
                  </div>
                  <div className="middleInfo">
                    <QuickreplyTwoToneIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">
                      {community.numberOfPosts}
                    </span>
                  </div>
                  <div className="middleInfo">
                    <AccountCircleTwoToneIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">
                      Creator: {community.createdBy}
                    </span>
                  </div>
                </div>
              </i>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col sm={2}>
                  <div className="ImgContainer">
                    <img
                      className="rightbarFollowingImg"
                      src={community.communityImage}
                    ></img>
                  </div>
                </Col>
                <Col>
                  <Card.Title>
                    {/* <Link to={`/communityDetail/${community.communityName}`}>
                      {community.communityName}
                    </Link> */}
                    <span className="link-lookalike" onClick={LinkClickHandler}>
                      {community.communityName}
                    </span>
                  </Card.Title>
                  <Card.Text>{community.communityDescription}</Card.Text>
                  <Button
                    disabled={success}
                    onClick={JoinCommunityHandler}
                    variant="outline-dark"
                  >
                    Join
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CommunityTile;
