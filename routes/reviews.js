const { addReview, getReviews } = require("../database/reviews_db");
const { auth } = require("../middleware/authorization");

const router = require("../server/node_modules/express").Router();

router.get("/", async (req, res) => {
  const review = await getReviews();
  res.send(review);
});

router.post("/", auth, async (req, res) => {
  await addReview(
    req.body.iduser,
    req.body.review_text,
    req.body.review_num,
    req.body.movieid,
    req.body.serieid
  );
  res.end();
});

module.exports = router;
