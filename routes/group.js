const {
  getGroups,
  createGroup,
  allGroups,
  allUsernameGroups,
  deleteGroup,
  getUsersFromGroup
} = require("../database/group_db");

const router = require("../server/node_modules/express").Router();

router.get("/users/:idgroup", async (req, res) => {
  try {
    console.log('meni')
    const users = await getUsersFromGroup(req.params.idgroup);
    res.json(users);
  } catch(error) {
    res.status(500).json({ success: false, message: "Virhe käyttäjien hakemisessa" });
  }
});

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

router.delete("/", async (req, res) => {
  try {
    deleteGroup(req.body.idgroup);
    res.json("Ryhmä poistettu");
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
