import Post from "../post/Post";
import "./CommunityFeed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ExploreTwoToneIcon from "@mui/icons-material/ExploreTwoTone";

export default function CommunityFeed(communityName) {
  //get all the posts and pass it as props
  const [posts, setPosts] = useState([]);
  console.log("infeed", JSON.stringify(communityName));

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

  return (
    <div className="communityfeed">
      <div>
        <h4 style={{ float: "left", marginLeft: "20px" }}>
          <ExploreTwoToneIcon /> &nbsp;Welcome to {communityName.communityName}
        </h4>
      </div>
      <div>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
