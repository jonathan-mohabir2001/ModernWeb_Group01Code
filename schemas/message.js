const mongoose = require("mongoose");


let messageSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    }, 
    message:{
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Messages", messageSchema)

