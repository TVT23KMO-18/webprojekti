const router = require("../server/node_modules/express").Router();
const {
  getRequestById,
  deleteRequestById,
  addRequest,
} = require("../database/group_request_db");

router.get("/:idgroup", async (req, res) => {
  const idgroup = req.params.idgroup;
  try {
    const result = await getRequestById(idgroup);
    res.json(result);
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:idgroup_request", async (req, res) => {
  const idgroup_request = req.params.idgroup_request;
  try {
    await deleteRequestById(idgroup_request);
    res.json("Request deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  const { idUser, idGroup } = req.body;
  try {
    await addRequest(idUser, idGroup);
    res.status(200).json("Request added");
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
