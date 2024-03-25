const mongoose = require("mongoose")

const connectDb = async() =>{
try{
    var MongoUrl = process.env.MONGO_URL
    const connect = await mongoose.connect("mongodb://localhost:27017/chat")

    console.log("Database Connected to", connect.connection.host,connect.Connection.name)
}
catch(err){

    console.log(err)
    process.exit(1)

}
}

module.exports = connectDb