const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authR = require("./routes/auth")
const userR = require("./routes/user")
const orderR = require("./routes/Order")
const inventoryR = require("./routes/Inventory")
dotenv.config()
const app = express()

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("conect to mongoDB >>>")
}) 

app.use(cors()) // fix lỗi
app.use(cookieParser())
app.use(express.json())




app.use("/inventory",inventoryR)//câu 1 và câu 2 câu 3
app.use("/auth",authR)//câu 4


app.use("/user",userR)

app.use("/order",orderR)// câu 6
app.listen(8000,()=>{
    console.log("running....")
})
