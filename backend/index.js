const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.port || 3001;
const axios = require("axios");
const http = require("http");
const cors = require("cors");
const connectMongo = require("./utils/mongoose");

app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );



  connectMongo();

app.get("/", (req, res) => {
    res.status(200).send("DevConnect Server Started");
  });

  app.listen(port, () => {
  console.log(
    `Express Server for Devconnect started at http://localhost:${port}`
  );
});

app.use(express.json());
