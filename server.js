const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes")
const messageRouter = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


app.get("/hello", (req,res)=>{
    res.send("Hello World")
})

app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message", messageRouter);

//app.use(notFound)
//app.use(errorHandler)

if (process.env.NODE_ENV == 'production') {
    const path = require('path')

    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})

const io= require("socket.io")(server, {
    pingTimeOut: 60000,
    cors: {
        origin: ["http://localhost:3000","https://chat-dskr2pgg7-dimplegore.vercel.app"]
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room)
    })

    socket.on("typing", (room)=> socket.in(room).emit("typing"));
    socket.on("stop typing", (room)=> socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        console.log(newMessageReceived)
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })

    /*socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    }
    )*/
})