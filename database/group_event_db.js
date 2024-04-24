const pgPool = require("./pg_connection");

async function getGroupEventById(idgroup) {
  let result = await pgPool.query(
    "Select * FROM group_event WHERE idgroup = $1",
    [idgroup]
  );
  return result.rows;
}

async function addGroupEvent(
  eventid,
  idgroup,
  startingtime,
  urltoshow,
  theatre
) {
  try {
    const query = `
    INSERT INTO group_event
    (eventid,
      idgroup,
      startingtime,
      urltoshow,
      theatre)VALUES ($1,$2,$3,$4,$5)
  `;
    await pgPool.query(query, [
      eventid,
      idgroup,
      startingtime,
      urltoshow,
      theatre,
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteGroupReviewsByEventId(eventid) {
  try {
    const query = `
      DELETE FROM group_event
      WHERE eventid = $1
    `;
    await pgPool.query(query, [eventid]);
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  getGroupEventById,
  addGroupEvent,
  deleteGroupReviewsByEventId,
};
