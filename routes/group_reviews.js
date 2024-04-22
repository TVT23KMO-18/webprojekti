const router = require("../server/node_modules/express").Router();

const { getGroupReviewsById } = require("../database/group_reviews_db");

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

module.exports = router;
