require('dotenv').config();
const user = require('../routes/user')
const favourites = require('../routes/favourites')
const group = require('../routes/group')
const reviews = require('../routes/reviews')
const groupMembership = require('../routes/group_membership')
const auth = require('../routes/auth')

const pgPool = require('../database/pg_connection')

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = process.env.port || 3001


// Routes
app.use('/user', user)
app.use('/favourites', favourites)
app.use('/group', group)
app.use('/reviews', reviews)
app.use('/groupmembership', groupMembership)
app.use('/auth', auth)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/', (req, res) => {
    console.log("Getting root info")
    res.send('Welcome to the root')
})