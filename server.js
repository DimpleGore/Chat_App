const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());

app.get("/hello", (req,res)=>{
    res.send("Hello World")
})

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