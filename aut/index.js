const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const {aut} = require('./modules/aut')
const {reg} = require('./modules/reg')
const {AccountInfo} = require('./modules/home')
const {getKey} = require('./modules/key')

app.use(cors())
app.use(bodyParser.json())

app.post('/aut', aut)
app.post('/reg', reg)
app.get('/home', AccountInfo)
app.get('/key', getKey)

app.listen(port, () => {
    console.log('http://localhost:3000')
})