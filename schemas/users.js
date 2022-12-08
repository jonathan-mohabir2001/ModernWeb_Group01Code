const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required: true,
    },
    // email:{
    //     type: String,
    //     required: true,
    // },

})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} has already been taken' });



module.exports = mongoose.model("Users", userSchema)