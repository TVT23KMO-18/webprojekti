const router = require('../server/node_modules/express').Router()
const { deleteGM } = require('../database/groupmembership_db')

router.get('/', (req, res) => {
    res.send('Group Membership')
})

router.delete('/', async (req, res) => {
    try {
        await deleteGM(req.body.idgroup_membership)
        res.json('Jäsenyys poistettu')
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' })
    }
})


module.exports = router;