const router = require("../server/node_modules/express").Router();
const { deleteGM, addGM } = require("../database/groupmembership_db");
const { auth } = require("../middleware/authorization");

router.get("/", (req, res) => {
  res.send("Group Membership");
});

router.delete("/", async (req, res) => {
  try {
    await deleteGM(req.body.idgroup_membership);
    res.json("Jäsenyys poistettu");
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/", async (req, res) => {
  const { idUser, idGroup } = req.body;
  try {
    await addGM(idUser, idGroup);
    res.status(200).json("Jäsen lisätty");
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
