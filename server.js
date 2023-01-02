const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


app.get("/hello", (req,res)=>{
    res.send("Hello World")
})

app.use("/api/user",router)

app.use(notFound)
app.use(errorHandler)

if (process.env.NODE_ENV == 'production') {
    const path = require('path')

    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})