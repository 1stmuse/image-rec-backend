const mongoose = require('mongoose') 
const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    entries:{
        type: Number,
        required:false,
        default:0
    }
})

const user = mongoose.model('users', userSchema)
module.exports = user