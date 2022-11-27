import React, { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { ListGroup } from "react-bootstrap";
import "./rightbar.css";
import Addvertisement from "../addvertisement/Addvertisement";
import Rules from "../Rules/Rules";
import { Room } from "@mui/icons-material";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Rightbar({ profile }) {
  const navigate = useNavigate();
  let renderComponent;
  let commName = " ";
  commName = localStorage.getItem("communityName");
  const user = JSON.parse(localStorage.getItem("user"));
  const emailId = user.email;
  const [userCommunities, setUserCommunities] = useState([]);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [friends, setFriends] = useState([" "]);

  useEffect(() => {
    fetchUserCommunities(emailId);
    fetchCommunityMembers(commName);
    fetchFriends(emailId);
  }, []);

  const fetchUserCommunities = async (emailId) => {
    try {
      console.log("User email in getUser Community API", emailId);
      const result = await axios.get(
        "api/communities/getCommunities/" + emailId
      );
      setUserCommunities(result.data[0].followers);
      console.log("UserCommunities", userCommunities);
    } catch (err) {
      console.log("cannot fetch user communities");
    }
  };

  const fetchCommunityMembers = async (communityName) => {
    try {
      const result = await axios.get(
        "api/communities/getAllMembers/" + communityName
      );
      console.log(result.data[0]);
      setCommunityMembers(result.data[0].communityMembers);
    } catch (err) {
      console.log("cannot fetch community members");
    }
  };

  const fetchFriends = async (emailID) => {
    try {
      const result = await axios.get(
        "api/communities/getAllFriends/" + emailID
      );
      console.log(result.data[0]);
      setFriends(result.data[0].following);
    } catch (err) {
      console.log("cannot fetch community members");
    }
  };

  const communityClickHandler = (community) => {
    console.log("in rightbar community", community);
    localStorage.setItem("communityName", community);
    navigate("/communitydetail");
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="topjobpostContainer">
          <WorkIcon htmlColor="#0066ff" className="jobpostImg" alt=" " />
          <span className="jobpostText">
            <b>Meta</b> and <b>3 other </b> companies posted job today.
          </span>
        </div>
        <div className="addvertisementSection">
          <Addvertisement />
        </div>
        <span className="rightbarTittle">Your Developer Friends</span>
        <div
          style={{
            height: 300,
            display: "block",
            maxWidth: 500,
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            color: "primary",
          }}
        >
          <ListGroup>
            {friends.map((friend) => (
              <ListGroup.Item key={friend}>
                <img
                  className="rightbarProfileImg"
                  src="https://thumbs.dreamstime.com/b/hands-cooperation-friend-icon-element-friendship-icon-white-background-hands-cooperation-friend-icon-element-friendship-158003173.jpg"
                ></img>
                {friend}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTittle"> User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Areas of Expertise :</span>
            <span className="rightbarInfoValue">C++, java, React</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Location :</span>
            <span className="rightbarInfoValue">
              <Room className="rightbarInfoValueIcon" />
              New york
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Help Required In :</span>
            <span className="rightbarInfoValue">React Native</span>
          </div>
        </div>
        <h4 className="rightbarTittle"> Communities </h4>
        <div
          style={{
            height: 255,
            display: "block",
            maxWidth: 400,
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            color: "primary",
          }}
        >
          <ListGroup>
            {userCommunities.map((community) => (
              <ListGroup.Item key={community}>
                <img
                  className="rightbarProfileImg"
                  src="https://www.creativefabrica.com/wp-content/uploads/2020/08/11/group-people-icon-Graphics-4928818-1.jpg"
                ></img>
                <span
                  value={community}
                  // onClick={communityClickHandler(JSON.stringify(community))}
                >
                  {community}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <h4 className="rightbarTittle"> Your Developer Friends </h4>
        <div
          style={{
            flex: 1,
            display: "block",
            maxWidth: 400,
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            color: "primary",
          }}
        >
          <ListGroup>
            {friends.map((friend) => (
              <ListGroup.Item key={friend}>
                <img
                  className="rightbarProfileImg"
                  src="https://thumbs.dreamstime.com/b/hands-cooperation-friend-icon-element-friendship-icon-white-background-hands-cooperation-friend-icon-element-friendship-158003173.jpg"
                ></img>
                {friend}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <Addvertisement />
      </>
    );
  };

  const CommunityRightbar = () => {
    return (
      <>
        <div className="rightbarInfo">
          <Rules />
        </div>
        <h4 className="rightbarTittle"> Communities you are part of </h4>
        <div
          style={{
            height: 255,
            display: "block",
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            color: "primary",
          }}
        >
          <div className="rightbarInfo">
            <ListGroup>
              {userCommunities.map((community) => (
                <ListGroup.Item key={community}>
                  <img
                    className="rightbarProfileImg"
                    src="https://www.creativefabrica.com/wp-content/uploads/2020/08/11/group-people-icon-Graphics-4928818-1.jpg"
                  ></img>
                  <span
                  // onClick={communityClickHandler(JSON.stringify(community))}
                  >
                    {community}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>

        <h4 className="rightbarTittle">Community Members</h4>
        <div
          style={{
            height: 255,
            display: "block",
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            color: "primary",
          }}
        >
          <div className="rightbarInfo">
            <ListGroup>
              {communityMembers.map((member) => (
                <ListGroup.Item key={member}>
                  <img
                    className="rightbarProfileImg"
                    src="https://image.shutterstock.com/image-vector/thin-line-user-icon-on-260nw-519039097.jpg"
                  ></img>
                  {member}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="rightbarInfo">
          <Addvertisement />
        </div>
      </>
    );
  };

  if (profile === "home") {
    renderComponent = <HomeRightbar />;
  } else if (profile === "community") {
    renderComponent = <CommunityRightbar />;
  } else {
    renderComponent = <ProfileRightbar />;
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{renderComponent}</div>
    </div>
  );
}
