import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation";
import { useContext, useEffect, useState, useRef } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Message from "../../components/message/Message";
import io from "socket.io-client"

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
console.log(user);
    console.log(user.email);

    // useEffect(() => {
    //   socket.current = io("ws://localhost:8900");
    //   // socket.current.on("getMessage", (data) => {
    //   //   setArrivalMessage({
    //   //     sender: data.senderId,
    //   //     text: data.text,
    //   //     createdAt: Date.now(),
    //   //   });
    //   // });
    // }, []);

    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/api/conversation/" + user.email);
            console.log(res);
            console.log(res.data);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user.email]);

      console.log(currentChat);


      useEffect(() => {
        const getMessages = async () => {
          try {
            console.log(currentChat._id);
            const res = await axios.get("/api/message/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);

      console.log(messages);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user.email,
          text: newMessage,
          conversationId: currentChat._id,
        };
        
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        // socket.current.emit("sendMessage", {
        //   senderId: user._id,
        //   receiverId,
        //   text: newMessage,
        // });
    
        try {
          const res = await axios.post("/api/message", message);
          
          setMessages([...messages, res.data]);
          console.log("NEW MESSAGE PRINTED DOWN");
          setNewMessage(""); //not working text box not getting refreshed.
          console.log(newMessage); 
        } catch (err) {
          console.log(err);
        }
        setNewMessage("");
      };

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <div>
            <Topbar />
            {/* <div className="chatMenu"></div>
            <div className="chatBox"></div>
            <div className="chatOnline"></div> */}
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                
                <Conversation conversation={c} currentUser={user} />
                
              </div>
            ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m)=>(
                                      <div ref = {scrollRef}><Message message={m} own={m.sender === user._id}/></div>
                                        
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e)=>setNewMessage(e.target.value)}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {/* <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}