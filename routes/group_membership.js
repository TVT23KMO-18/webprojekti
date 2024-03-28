const router = require('../server/node_modules/express').Router()

router.get('/', (req, res) => {
    res.send('Group Membership')
})


module.exports = router;