const { getGroups, createGroup, allGroups, allUsernameGroups } = require('../database/group_db')

const router = require('../server/node_modules/express').Router()

router.get("/groups", async (req, res) => {
    const username = await getGroups(req.query.username)
    res.json(username)
})

router.get("/allgroups", async (req, res) => {
    const groups = await allGroups()
    res.json(groups)
})

router.get("/groupsbyusername", async (req, res) => {
    const groups = await allUsernameGroups(req.query.username)
    res.json(groups)
})

router.post("/", async (req, res) => {
    await createGroup(req.body.username, req.body.groupname, req.body.description)
    res.end()
})


module.exports = router;