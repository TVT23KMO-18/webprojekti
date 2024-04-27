const {
  getGroups,
  createGroup,
  allGroups,
  allUsernameGroups,
  deleteGroup,
  getUsersFromGroup,
  getOwner,
  deleteUser,
  getGroupsByOwner,
} = require("../database/group_db");

const router = require("../server/node_modules/express").Router();

router.get("/users/:idgroup", async (req, res) => {
  try {
    const users = await getUsersFromGroup(req.params.idgroup);
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe käyttäjien hakemisessa" });
  }
});

router.get("/groupowner/:idgroup", async (req, res) => {
  console.log("joo");
  try {
    const owner = await getOwner(req.params.idgroup);
    res.json(owner);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Virhe ryhmän omistajan hakemisessa" });
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

router.delete("/deletebyusername", async (req, res) => {
  try {
    console.log(req.body.username, req.body.idgroup);
    deleteUser(req.body.username, req.body.idgroup);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
router.get("/groupsbyowner/:owner", async (req, res) => {
  const owner = req.params.owner;

  try {
    const result = await getGroupsByOwner(owner);
    res.json(result);
  } catch (error) {
    console.error("Error fetching groups by owner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
