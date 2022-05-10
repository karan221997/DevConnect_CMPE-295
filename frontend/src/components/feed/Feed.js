
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from "axios";
//import {Posts} from "../../dummyData.js";

export default function Feed() {

  //get all the posts and pass it as props
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      async function fetchPosts() {
        const user = JSON.parse(localStorage.getItem('user'));
       console.log("email is: " + JSON.stringify(user.email));
       const result =  await axios.post("api/posts/getAllPost",JSON.stringify(user.email))
       console.log("posts are",result.data.posts);
       setPosts(result.data.posts);
    }
    fetchPosts();
  }, []);


  return (
    <div className="feed">
        <div className="feedWrapper">
           {posts.map((p) => (
             <Post key={p.id} post={p}/>
            ))}  
        </div>
    </div>
  );
}
