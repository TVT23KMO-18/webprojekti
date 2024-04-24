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

async function addGroupReviews(idreviews, idgroup) {
  try {
    const query = `
    INSERT INTO group_reviews
    (idreviews,idgroup)VALUES ($1,$2)
  `;
    await pgPool.query(query, [idreviews, idgroup]);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getGroupReviewsById,
  addGroupReviews,
};
