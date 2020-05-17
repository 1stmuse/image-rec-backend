const router = require('express').Router()
const {signUp} = require('../contollers/index')

router.post("/register", signUp)

module.exports = router