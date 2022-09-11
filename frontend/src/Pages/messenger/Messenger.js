import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation";
import { useContext, useEffect, useState, useRef } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Message from "../../components/message/Message";
import {io} from "socket.io-client";
import ChatOnline from "../../components/chatOnline/ChatOnline"

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  //console.log(user);
    //console.log(user.email);

    useEffect(()=>{
      socket.current = io("ws://localhost:8900");
      console.log("arrival message setting");
      socket.current.on("getMessage",data=>{
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt : Date.now(),
          });
          console.log(arrivalMessage);
      });
    },[]);

    // useEffect(()=>{
    //   arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    //   setMessages((prev)=>[...prev,arrivalMessage])
    // },[arrivalMessage,currentChat]);

    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
   
    useEffect(()=>{
      socket.current.emit("addUser", user.email);
      socket.current.on("getUsers",users=>{
        console.log(users);
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userId === f))
        );
      });
    },[user]);

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

      //console.log(currentChat);


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

      //console.log(messages);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user.email,
          text: newMessage,
          conversationId: currentChat._id,
        };
        
    console.log("HERE");

        const receiverId = currentChat.members.find(
          (member) => member !== user.email
        );

    console.log("for socket ---- "+receiverId);
        socket.current.emit("sendMessage", {
          senderId: user.email,
          receiverId,
          text: newMessage,
        });
    
        try {
          const res = await axios.post("/api/message", message);
          
          setMessages([...messages, res.data]);
          setNewMessage("");
          console.log("NEW MESSAGE PRINTED DOWN");
          console.log(newMessage); 
        } catch (err) {
          console.log(err);
        }
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
                                      <div ref = {scrollRef}><Message message={m} own={m.sender === user.email}/></div>
                                        
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
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user.email}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}