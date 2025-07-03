const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path=require("path")

//dotenv configuaration
dotenv.config();

//res object
const app = express();

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

// console.log(
//   app._router.stack
//     .filter(r => r.route)
//     .map(r => r.route.path)
// );


//port

const PORT = process.env.PORT || 5000;

//listning
app.listen(PORT,()=>{
    console.log(`node server is running at http://localhost:${PORT}`)
})