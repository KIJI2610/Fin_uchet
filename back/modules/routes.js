const express = require('express')
const router = express.Router()
const {aut} = require('./aut')
const {reg} = require('./reg')

router.get('/', async (req, res) => {
    res.send(`you balance: 0`)
})

router.post('/aut', aut)
router.post('/reg', reg)

module.exports = router