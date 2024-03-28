require('../server/node_modules/dotenv').config();
const jwt = require('../server/node_modules/jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const username = jwt.verify(token, process.env.JWT_SECRET).username;
        res.locals.username = username;
        next();
    } catch(err) {
        res.status(403).json({error: 'Access forbidden.'})
    }
}


module.exports = {auth};