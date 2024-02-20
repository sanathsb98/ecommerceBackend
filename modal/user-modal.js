const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserModal = new Schema({
    name:{
        type : String,
      
    },
    email:{
        type : String,
    
        unique : true
    },
    password:{
        type : String,
   
        minlength : 6
    }
})



module.exports = mongoose.model("User",UserModal);