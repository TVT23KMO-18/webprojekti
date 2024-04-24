const {
  getGroupEventById,
  addGroupEvent,
  deleteGroupReviewsByEventId,
} = require("../database/group_event_db");
const { auth } = require("../middleware/authorization");

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

router.post("/", auth, async (req, res) => {
  const { eventid, idgroup, startingtime, urltoshow, theatre } = req.body;
  try {
    await addGroupEvent(eventid, idgroup, startingtime, urltoshow, theatre);
    res.status(200).json("Näytös lisätty ryhmään");
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  try {
    await deleteGroupReviewsByEventId(eventId);
    console.log("poistettu");
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting group reviews", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
