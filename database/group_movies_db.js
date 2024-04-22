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
async function addGroupMovie(serieid, movieid, idgroup, iduser) {
  try {
    const query = `
      INSERT INTO group_movies
      (serieid,movieid,idgroup,iduser)VALUES ($1,$2,$3,$4)
    `;
    await pgPool.query(query, [serieid, movieid, idgroup, iduser]);
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { getMoviesById, addGroupMovie };
