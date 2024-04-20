const pgPool = require("./pg_connection");

async function getGroupEventById(idgroup) {
  let result = await pgPool.query(
    "Select * FROM group_event WHERE idgroup = $1",
    [idgroup]
  );
  return result.rows;
}
module.exports = { getGroupEventById };
