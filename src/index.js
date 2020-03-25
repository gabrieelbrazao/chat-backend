require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const auth = require("./middlewares/auth");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

io.on("connection", socket => {
  socket.use(auth);
  socket.on("sendMessage", data => {
    socket.broadcast.emit("newMessage", {
      message: data.message,
      name: data.name
    });
  });
});

app.use(cors());
app.use(routes);
server.listen(process.env.PORT || 3333);
