const {
  addReview,
  getReviews,
  getReviewsByID,
  deleteReview,
} = require("../database/reviews_db");

const { auth } = require("../middleware/authorization");

const router = require("../server/node_modules/express").Router();

router.get("/", async (req, res) => {
  try {
    const review = await getReviews();
    res.send(review);
  } catch (error) {
    res.status(500).json({ error: "Virhe arvostelujen hakemisessa" });
  }
});

router.post("/", auth, async (req, res) => {
  const { iduser, review_text, review_num, movieid, serieid } = req.body;
  if (!review_num) {
    return res.status(400).json({ error: "Review number is required." });
  }
  try {
    await addReview(iduser, review_text, review_num, movieid, serieid);
    res.status(200).json("Arvostelu lisätty");
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/reviewsbyid/:idreviews", async (req, res) => {
  const idreviews = req.params.idreviews;
  try {
    const data = await getReviewsByID(idreviews);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reviews by id", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await deleteReview(req.body.idreviews);
    res.json("Arvostelu poistettu");
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
