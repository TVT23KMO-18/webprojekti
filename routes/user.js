const { getUsers, getOneUser, addUser, deleteUser } = require('../database/user_db')

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
    await addUser(req.body.username, req.body.password);
    res.end();
})

router.post('/deleteuser', async (req, res) => {
    await deleteUser(req.query.username);
    res.end();
})


module.exports = router;