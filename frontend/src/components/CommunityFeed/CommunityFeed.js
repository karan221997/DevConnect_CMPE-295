import Share from "../share/Share";
import Post from "../post/Post";
import "./CommunityFeed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
//import {Posts} from "../../dummyData.js";

export default function Feed() {
  //get all the posts and pass it as props
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await axios.post(
        "api/posts/getAllPost",
        JSON.stringify(user.email)
      );
      setPosts(result.data.posts);
    }
    fetchPosts();
  }, []);

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
