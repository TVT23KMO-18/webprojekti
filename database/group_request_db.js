const pgPool = require("./pg_connection");

async function getRequestById(idgroup) {
  try {
    const query = `
        SELECT *
        FROM group_request
        WHERE idgroup = $1
      `;

    const result = await pgPool.query(query, [idgroup]);
    return result.rows;
  } catch (error) {
    //console.error("Error fetching requests", error);
    //throw error;
  }
}

async function deleteRequestById(idgroup_request) {
  try {
    const query = `
      DELETE FROM group_request
      WHERE idgroup_request = $1
    `;

    await pgPool.query(query, [idgroup_request]);
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
}

async function addRequest(iduser, idgroup) {
  try {
    const query = "INSERT INTO group_request (iduser, idgroup) VALUES($1,$2)";
    await pgPool.query(query, [iduser, idgroup]);
  } catch (error) {
    console.error("Error adding request:", error);
    throw error;
  }
}
module.exports = { getRequestById, deleteRequestById, addRequest };
