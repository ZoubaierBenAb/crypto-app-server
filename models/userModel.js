const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name : {
        type : [String,'please enter a user name'],
        required : true
    },
    email : {
        type : [String,'please enter an email'],
        required : true,
        unique : true
    },
    password : {
        type : [String,'please enter a password'],
        required : true
    },

},{
    timestamps : true
})

const User = mongoose.model('User',userSchema);

module.exports = User