const express = require("express")
const path = require("path")
const moment = require("moment")
const app = express();
const a = require("./routes/api/members");
const { route } = require("./routes/api/members");

const PORT = process.env.PORT || 3000




// Body parser middleware
app.use(express.json())

// handling form submissions
app.use(express.urlencoded({extended: false }))

// creating a middleware
// log a url with date and time
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
    next();
}


app.use(logger)

// // "GET" IS A REQUEST \\ we going to use a static folder
// app.get("/",(req,res)=>{

//     // res.send("<h1>hello world</h1>")

//     // fetching files
//     res.sendFile(path.join(__dirname,"public","index.html"))
// })


// app.use(express.static(path.join(__dirname,"public")))

// ________________________________________________________________________________

// member API route
app.use('/api/members',a)




app.listen(3000,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})