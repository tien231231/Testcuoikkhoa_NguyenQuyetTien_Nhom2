const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authR = require("./routes/auth")
const userR = require("./routes/user")
const inventoryR = require("./routes/Inventory")
dotenv.config()
const app = express()

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("conect to mongoDB >>>")
}) 

app.use(cors()) // fix lỗi
app.use(cookieParser())
app.use(express.json())

//Routes
app.use("/auth",authR)
app.use("/inventory",inventoryR)

app.use("/user",userR)

app.listen(8000,()=>{
    console.log("running....")
})
