const express = require('express')
const app = express()
const port = 3000
const routes = require('./modules/routes')
const {OpenDatabase, CloseDatabase} = require('./modules/db')

app.use('/api', routes)
app.use(express.json())

app.listen(port, () => {
    console.log('http://localhost:3000')
})