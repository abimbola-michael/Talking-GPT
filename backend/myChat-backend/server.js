const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbconnection')
const dotenv = require("dotenv").config()
const router = express.Router()

connectDB();
const app = express()

app.use(router)

const PORT = process.env.PORT || 5000

// app.use("/api/contacts",require("./routes/contactRoutes"))
app.use(express.json())
app.use("/api/chats", require("./routes/chatRoutes"))
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})