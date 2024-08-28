const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(`you balance: 0`)
})

module.exports = router