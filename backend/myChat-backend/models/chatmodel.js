const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    name: {
        type: String,
        require: true, 
    },
    message: {
        type: String,
        require: true, 
    },
    Phone: {
        type: String,
        require: false, 
    },
    

},
{
    timestamps:true
}

)

module.exports = mongoose.model("chat", chatSchema)