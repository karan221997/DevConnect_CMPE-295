import WorkIcon from "@mui/icons-material/Work";
import { ListGroup } from "react-bootstrap";
import "./rightbar.css";
import { Users } from "../../dummyData.js";
import Onlineusers from "../onlineusers/Onlineusers";
import Addvertisement from "../addvertisement/Addvertisement";
import Rules from "../Rules/Rules";
import { Room } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
export default function Rightbar({ profile, userCommunities }) {
  const navigate = useNavigate();
  let renderComponent;

  const communityClickHandler = (community) => {
    const com = JSON.stringify(community);
    console.log("in rightbar community", com);
    localStorage.setItem("communityName", com);
    navigate("/communitydetail");
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="topjobpostContainer">
          <WorkIcon htmlColor="#0066ff" className="jobpostImg" />
          <span className="jobpostText">
            <b>Meta</b> and <b>3 other </b> companies posted job today.
          </span>
        </div>
        <div className="addvertisementSection">
          <Addvertisement />
        </div>
        <span className="rightbarTittle">Online Developer Friends</span>
        <ul className="rightbarDeveloperList">
          {Users.map((u) => (
            <Onlineusers key={u.id} user={u} />
          ))}
        </ul>
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
            overflow: "hidden",
            width: "100%",
            color: "primary",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <ListGroup>
              {userCommunities.map((community) => (
                <ListGroup.Item>
                  <img
                    className="rightbarProfileImg"
                    src="https://www.creativefabrica.com/wp-content/uploads/2020/08/11/group-people-icon-Graphics-4928818-1.jpg"
                  ></img>
                  <span onClick={communityClickHandler}>{community}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
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

        <div className="rightbarInfo" style={{ overflow: "hidden" }}>
          <ListGroup>
            {userCommunities.map((community) => (
              <ListGroup.Item>
                <img
                  className="rightbarProfileImg"
                  src="https://www.creativefabrica.com/wp-content/uploads/2020/08/11/group-people-icon-Graphics-4928818-1.jpg"
                ></img>
                {community}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <span className="rightbarTittle">Community Members</span>
        <ul className="rightbarDeveloperList">
          {Users.map((u) => (
            <Onlineusers key={u.id} user={u} />
          ))}
        </ul>
        <Addvertisement />
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
