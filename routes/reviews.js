const { addReview } = require('../database/reviews_db');
const { auth } = require('../middleware/authorization');

const router = require('../server/node_modules/express').Router()

router.get('/', async (req, res) => {
    res.send('Reviews')
})

router.post('/', auth, async (req,res) => {
    await addReview(req.body.idreviews, req.body.iduser, req.body.review_text, req.body.review_num, req.body.movieid);
    res.end();
})


module.exports = router;