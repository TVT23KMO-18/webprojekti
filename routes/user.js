const { getUsers, getOneUser, addUser, deleteUser } = require('../database/user_db')

const router = require('../server/node_modules/express').Router()

router.get('/', async (req, res) => {
    try {
        const user = await getUsers();
        res.json(user);
    } catch(error) {
        res.status(500).json({ success: false, message: 'Virhe käyttäjien hakemisessa' })
    }
})

router.get('/oneuser', async (req, res) => {
    try {
        const oneUser = await getOneUser(req.query.iduser);
        res.json(oneUser);
    } catch(error) {
        res.status(404).json(error.message)
    }
})

router.post('/adduser', async (req, res) => {
    await addUser(req.body.username, req.body.password);
    res.end();
})

router.post('/deleteuser', async (req, res) => {
    try {
        await deleteUser(req.query.username);
        res.status(200).json({ success: true, message: 'Käyttäjä poistettu' })
        res.end();
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ success: false, message: 'Käyttäjää ei löydy' });
        } else {
            console.error(error);
            res.status(500).json({ success: false, message: 'Virhe käyttäjän poistamisessa' });
        }
    }
});


module.exports = router;