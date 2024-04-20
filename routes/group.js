const {
  getGroups,
  createGroup,
  allGroups,
  allUsernameGroups,
} = require("../database/group_db");

const router = require("../server/node_modules/express").Router();

router.get("/groups", async (req, res) => {
  try {
    const username = await getGroups(req.query.username);
    res.json(username);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe ryhmien hakemisessa" });
  }
});

router.get("/allgroups", async (req, res) => {
  try {
    const groups = await allGroups();
    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe ryhmien hakemisessa" });
  }
});

router.get("/groupsbyusername", async (req, res) => {
  try {
    const groups = await allUsernameGroups(req.query.username);
    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe ryhmien hakemisessa" });
  }
});

router.post("/", async (req, res) => {
  try {
    await createGroup(
      req.body.username,
      req.body.groupname,
      req.body.description
    );
    res.json("Ryhmä luotu.");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe ryhmän luomisessa" });
  }
});

module.exports = router;
