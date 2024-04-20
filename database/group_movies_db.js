const pgPool = require("./pg_connection");

async function getMoviesById(idgroup) {
  try {
    const query = `
      SELECT *
      FROM group_movies
      WHERE idgroup = $1
    `;

    const result = await pgPool.query(query, [idgroup]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching movies", error);
    throw error;
  }
}

module.exports = { getMoviesById };
