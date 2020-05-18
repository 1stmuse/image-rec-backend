const passport = require('passport')
const router = require('express').Router()
const {signUp, login} = require('../contollers/index')

router.post('/register', signUp)
router.post('/login', passport.authenticate('local') ,login)

module.exports = router