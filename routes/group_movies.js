const router = require("../server/node_modules/express").Router();

const { getMoviesById } = require("../database/group_movies_db");

router.get("/movies/:idgroup", async (req, res) => {
  const idgroup = req.params.idgroup;
  try {
    const movies = await getMoviesById(idgroup);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
