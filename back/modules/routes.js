const express = require('express')
const router = express.Router()
const {aut} = require('./aut')
const {reg} = require('./reg')
const {Balance} = require('./home')

router.get('/', async (req, res) => {
    res.send(`you balance: 0`)
})

router.post('/aut', aut)
router.post('/reg', reg)
router.post('/home', Balance)

module.exports = router