const pgPool = require("./pg_connection");

async function getGroupReviewsById(idgroup) {
  try {
    const query = `
    SELECT *
    FROM group_reviews
    WHERE idgroup = $1
    `;

    const result = await pgPool.query(query, [idgroup]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching grouprewies data by id", error);
    throw error;
  }
}
module.exports = { getGroupReviewsById };
