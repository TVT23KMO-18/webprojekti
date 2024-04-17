const { getUsers, getOneUser, addUser, deleteUser } = require('../database/user_db')

const router = require('../server/node_modules/express').Router()

router.get('/', async (req, res) => {
    const user = await getUsers();
    res.json(user);
})

router.get('/oneuser', async (req, res) => {
    const oneUser = await getOneUser(req.query.iduser);
    res.json(oneUser);
})

router.post('/adduser', async (req, res) => {
    await addUser(req.body.username, req.body.password);
    res.end();
})

router.post('/deleteuser', async (req, res) => {
    try {
        await deleteUser(req.query.username);
        res.end();
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ success: false, message: 'Käyttäkää ei löydy' });
        } else {
            console.error(error);
            res.status(500).json({ success: false, message: 'Virhe käyttäjän poistamisessa' });
        }
    }
});


module.exports = router;