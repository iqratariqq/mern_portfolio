const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path=require("path");



//dotenv configuaration
dotenv.config();

//res object
const app = express();

const __dirname=path.resolve();

//middleware
app.use(cors());
app.use(express.json());

//static file
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/portfolio',require('./routes/routes'))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//port

const PORT = process.env.PORT || 5000;

//listning
app.listen(PORT,()=>{
    console.log(`node server is running at ${PORT}`)
})