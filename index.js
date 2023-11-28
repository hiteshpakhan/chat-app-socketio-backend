const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");  
const port = 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log(`user connected : ${socket.id}`);

    socket.on("send-message", (message) => {
    // but we want to sent this message to the all the connected user
    io.emit("recived-message", message);
    })

    socket.on("disconnect", ()=> console.log("user disconnected"));
})

server.listen(port,() => console.log(`server is running on port ${port}`));