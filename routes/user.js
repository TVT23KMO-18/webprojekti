const { getUsers, getOneUser, addUser } = require('../database/user_db')

const router = require('../server/node_modules/express').Router()

router.get('/', async (req, res) => {
    const user = await getUsers();
    res.json(user);
})

router.get('/oneuser', async (req, res) => {
    const oneUser = await getOneUser(req.query.iduser);
    console.log(oneUser);
    res.json(oneUser);
})

router.post('/adduser', async (req, res) => {
    await addUser(req.body.iduser, req.body.username, req.body.password);
    res.end();
})


module.exports = router;