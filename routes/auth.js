require('../server/node_modules/dotenv').config();
const router = require('../server/node_modules/express').Router();
const { register, getPassword } = require('../database/auth_db');
const bcrypt = require('../server/node_modules/bcrypt');
const jwt = require('../server/node_modules/jsonwebtoken');

router.post('/register', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const pwHash = await bcrypt.hash(password, 10);

    await register(username, pwHash);

    res.end();

});

router.post('/login', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const db_pass = await getPassword(username);

    if(db_pass) {
        const isAuth = await bcrypt.compare(password, db_pass);
        if(isAuth) {
            const token = jwt.sign({username: username}, process.env.JWT_SECRET);
            res.status(200).json({jwtToken: token});
        } else {
            res.status(401).json({error: 'Wrong password'})
        }
    } else {
        res.status(404).json({error: 'User not found'});
    }
})

module.exports = router;