const pgPool = require("./pg_connection");

const sql = {
  ADD_REVIEW:
    "INSERT INTO reviews (iduser, review_text, review_num, movieid, serieid) VALUES ($1,$2,$3,$4,$5)",
  GET_ALL_REVIEWS: "SELECT * FROM reviews",
};

async function addReview(iduser, review, num, movieid, serieid) {
  await pgPool.query(sql.ADD_REVIEW, [iduser, review, num, movieid, serieid]);
}

async function getReviews() {
  let result = await pgPool.query(sql.GET_ALL_REVIEWS);

  return result.rows;
}

module.exports = { addReview, getReviews };
