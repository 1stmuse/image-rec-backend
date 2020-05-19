const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const auth = (passport)=>{
    passport.use(
        new localStrategy({usernameField:'email'}, async(email, password, done)=>{
            try {
                const user = await User.findOne({email:email})
                if(!user) return done(null, false, {message:'email or password incorrect'})
                const pass = await bcrypt.compare(String(password), user.password);
                if(!pass) {
                    return done(null, false, {message:'email or password incorrect'})
                }else{
                    return done(null, user)
                }

            } catch (error) {
                console.log(error)
            }
        })
    )
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user)
        })
    })
}

module.exports = auth