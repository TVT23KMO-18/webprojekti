const router = require("../server/node_modules/express").Router();
const { auth } = require("../middleware/authorization");

const { getMoviesById, addGroupMovie } = require("../database/group_movies_db");

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

router.post("/", auth, async (req, res) => {
  const { serieid, movieid, idgroup, iduser } = req.body;
  try {
    await addGroupMovie(serieid, movieid, idgroup, iduser);
    res.status(200).json("Elokuva listätty ryhmään");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
