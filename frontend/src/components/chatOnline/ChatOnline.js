import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  console.log("chatonline");
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/api/users/friends/" + currentId);
      console.log(res.data);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f.email)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/api/conversations/find/${currentId}/${user.email}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
console.log(onlineFriends);
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            {/* <img
              className="chatOnlineImg"
              // src={
              //   o?.profilePicture
              //     ? PF + o.profilePicture
              //     : PF + "person/noAvatar.png"
              // }
              alt=""
            /> */}
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.email}</span>
        </div>
      ))}
    </div>
  );
}