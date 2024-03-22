const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = 3001

app.listen(port, () => {
    console.log('App is running on port ${port}')
})