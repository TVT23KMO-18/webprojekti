const pgPool = require("./pg_connection");

async function deleteGM(id) {
  await pgPool.query(
    "DELETE FROM group_membership WHERE idgroup_membership=$1",
    [id]
  );
}
async function addGM(idUser, idGroup) {
  const query = "INSERT INTO group_membership (iduser, idgroup) VALUES($1,$2)";
  try {
    await pgPool.query(query, [idUser, idGroup]);
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { deleteGM, addGM };
