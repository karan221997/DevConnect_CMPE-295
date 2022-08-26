import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.email);

    const getUser = async () => {
      try {
        const res = await axios("api/users/getUserByEmail/" + friendId);
        setUser(res.data.user[0]);
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        
        alt=""
      />
      <span className="conversationName">{user?.userName}</span>
    </div>
  );
}