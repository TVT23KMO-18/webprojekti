const { getGroups } = require('../database/group_db')

const router = require('../server/node_modules/express').Router()

router.get("/groups", async (req, res) => {
    const username = await getGroups(req.query.username)
    res.json(username)
})


module.exports = router;