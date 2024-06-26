const router = require("../server/node_modules/express").Router();

const {
  getGroupReviewsById,
  addGroupReviews,
 
} = require("../database/group_reviews_db");
const { auth } = require("../middleware/authorization");

router.get("/reviews/:idgroup", async (req, res) => {
  const idgroup = req.params.idgroup;
  try {
    const data = await getGroupReviewsById(idgroup);
    //console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching group reviews", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { idreviews, idgroup } = req.body;
  try {
    await addGroupReviews(idreviews, idgroup);
    res.status(200).json("Arvostelu lisätty ryhmään");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
