const express = require("express");
const app = express();
const port = process.env.port || 3001;
const axios = require("axios");
const http = require("http");
const cors = require("cors");
const connectMongo = require("./utils/mongoose");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const hacakthonRoute = require("./routes/hackathon");
const conversationRoute = require("./routes/conversations");
const jobRoute = require("./routes/jobs");
const communityRoute = require("./routes/communities");
const communityDetailRoute = require("./routes/communitydetail");

dotenv.config();

connectMongo();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/message", messageRoute);
app.use("/api/hackathon", hacakthonRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/job", jobRoute);
app.use("/api/communities", communityRoute);
app.use("/api/communitydetail", communityDetailRoute);

app.get("/", (req, res) => {
  res.status(200).send("DevConnect-backend Server Started");
});

app.listen(port, () => {
  console.log(
    `Express Backend Server for Devconnect started at http://localhost:${port}`
  );
});

app.use(express.json());
