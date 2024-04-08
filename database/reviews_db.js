const pgPool = require("./pg_connection");

const sql = {
  ADD_REVIEW:
    "INSERT INTO reviews (idreviews, iduser, review_text, review_num, movieid) VALUES ($1,$2,$3,$4,$5)",
  GET_ALL_REVIEWS: "SELECT * FROM reviews",
};

async function addReview(idreview, iduser, review, num, movieid) {
  await pgPool.query(sql.ADD_REVIEW, [idreview, iduser, review, num, movieid]);
}

async function getReviews() {
  let result = await pgPool.query(sql.GET_ALL_REVIEWS);

  return result.rows;
}

module.exports = { addReview, getReviews };
