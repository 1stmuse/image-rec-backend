const session = require('express-session')
const auth = (req, res, next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        const error = new Error('you are not authenticated');
            error.status= 400
            next(error)
    }
}

module.exports = auth