const { auth } = require('../middleware/authorization');

const router = require('../server/node_modules/express').Router()

router.get('/', auth ,async (req, res) => {
    
})


module.exports = router;