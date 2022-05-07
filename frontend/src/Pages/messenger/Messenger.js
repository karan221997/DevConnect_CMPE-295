import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"

export default function Messenger() {
    const currentChat =null;
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
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        
                                    ></textarea>
                                    <button className="chatSubmitButton" >
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