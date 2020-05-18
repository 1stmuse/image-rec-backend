const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors')
const mongoose= require('mongoose')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const Auth = require('./config/passport')
var FileStore = require('session-file-store')

require('dotenv').config();

const apiRouter = require('./routes/index')
const app = express()
Auth(passport)
const port= process.env.PORT || 4000

// app.use(bodyParser)
app.use(cors());
app.use(express.json());
app.use(session({
    name:'session-id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(path.join(__dirname,"../build")))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('DB connected'))
.catch(err=> console.log('error connexting', err))
// const connection=mongoose.connection;
// connection.once('open', ()=>{
//     console.log('connected')
// })
mongoose.Promise = global.Promise


app.use('/api', apiRouter)
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 400
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(port, ()=>{
    console.log('server running')
});