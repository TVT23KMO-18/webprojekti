const { getGroupEventById } = require("../database/group_event_db");
const router = require("../server/node_modules/express").Router();
router.get("/:idgroup", async (req, res) => {
  const idgroup = req.params.idgroup;
  try {
    const events = await getGroupEventById(idgroup);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
