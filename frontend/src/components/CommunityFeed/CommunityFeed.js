import Share from "../share/Share";
import Post from "../post/Post";
import "./CommunityFeed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function CommunityFeed(communityName) {
  //get all the posts and pass it as props
  const [posts, setPosts] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  let userComm = [];
  console.log("infeed", communityName);

  useEffect(() => {
    async function fetchPosts() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user.email);
      const result = await axios.post("api/communities/getAllPostInCommunity", {
        communityName: communityName.communityName,
      });
      console.log(result.data);
      setPosts(result.data);
    }
    fetchPosts();
   
  }, []);

  

  const fetchUserCommunityNames = (userCommunities) => {
    for (let i = 0; i < userCommunities.length; i++) {
      const result = axios.get(
        "api/communities/getCommunityDetail/" + userCommunities[i]
      );
      userComm.push(result.data[0].communityName);
    }
  };
  console.log("This is the user comm array", userComm);

  return (
    <div className="communityfeed">
      <div className="ask_question_button">
        <Button
          variant="outline-dark"
          style={{ float: "right", marginBottom: "5px" }}
        >
          <HelpOutlineIcon /> Ask in Community
        </Button>
      </div>
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
