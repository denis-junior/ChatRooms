const express = require("express");
const app = express();
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        allowedHeaders: ["Content-Type"],
        origin: "*",
        methods: ["GET", "POST"],
    }
})

app.get("/", (req, res) => {
    res.send({ text: "Hello" })
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User ${socket.id} joined room: ${data}`);

    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });

})

server.listen(3001, () => {
    console.log("server is running!")
})

module.exports = app;