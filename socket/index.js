const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  const addUser = (userId,socketId)=>{
    !users.some(user=>user.userId === userId) && 
      users.push({userId,socketId})
  }

  const removeUser = (socketId)=>{
    users = users.filter((user) => user.socketId !== socketId);
  }

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //get user info
    socket.on("addUser", userId=>{
      addUser(userId,socket.id);
      io.emit("getUsers",users);
    })

    //send n receive msg
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        console.log(user);
        console.log(user.socketId)
        io.to(user.socketId).emit("getMessage",{
          senderId,
          text,
        })
    })


    //disconnection
    socket.on("disconnect", ()=>{
      console.log("someone got disconnected");
      removeUser(socket.id);
      io.emit("getUsers",users);
    })
    });
  
