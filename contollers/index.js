const bcrypt = require('bcrypt');
const passport = require('passport')

const User = require('../models/userModel')


exports.signUp = async(req, res, next)=>{
    const email = await User.findOne({email:req.body.email})
    if(email) {
        const error = new Error('user name with that error not fount');
        error.status= 400
        next(error)
    }
    const userName = await User.findOne({userName:req.body.userName})
    if(userName) return res.status(401).json('username not available')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(String(req.body.password), salt)

    const user ={
        name:req.body.name,
        email:req.body.email,
        userName: req.body.userName,
        password:hashPassword
    }
    try {
        const newUser = new User(user)
        newUser.save()
        .then(user =>res.json(user))
        .catch(err => next(err))
    } catch (error) {
        next(error)
    }
}

exports.login =(req,res,next)=>{
    const {entries, name, _id} = req.user
    res.json({user:{
        entries,
        name,
        _id
    }})
}

exports.uplaod = async(req,res,next)=>{
    
    try {
        const user = await User.findById({_id:req.body.id})
        if(!user){
            const error = new Error('this user does not exist');
            error.status= 400
            next(error)
        }
        user.entries +=1
        user.save()
        .then(user=>res.json(user.entries))
    } catch (error) {
        next(`catch error ${error}`)
    }
}