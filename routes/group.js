const { getGroups, createGroup } = require('../database/group_db')

const router = require('../server/node_modules/express').Router()

router.get("/groups", async (req, res) => {
    const username = await getGroups(req.query.username)
    res.json(username)
})

router.post("/", async (req, res) => {
    await createGroup(req.body.username, req.body.groupname)
    res.end()
})


module.exports = router;