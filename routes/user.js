const passport = require('passport')
const auth = require('../config/Auth')
const router = require('express').Router()
const {signUp, login, uplaod} = require('../contollers/index')

router.post('/register', signUp)
router.post('/login', passport.authenticate('local') ,login)
router.post('/upload',uplaod)

module.exports = router