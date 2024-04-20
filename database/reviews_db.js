const pgPool = require("./pg_connection");

const sql = {
  ADD_REVIEW:
    "INSERT INTO reviews (iduser, review_text, review_num, movieid, serieid) VALUES ($1,$2,$3,$4,$5)",
  GET_ALL_REVIEWS: "SELECT * FROM reviews",
  GET_REVIEWS_BY_ID: "SELECT * FROM reviews Where idreviews = $1",
};

async function addReview(iduser, review, num, movieid, serieid) {
  try {
    await pgPool.query(sql.ADD_REVIEW, [iduser, review, num, movieid, serieid]);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function getReviews() {
  let result = await pgPool.query(sql.GET_ALL_REVIEWS);

  return result.rows;
}

async function getReviewsByID(idreviews) {
  let result = await pgPool.query(sql.GET_REVIEWS_BY_ID, [idreviews]);

  return result.rows;
}
module.exports = { addReview, getReviews, getReviewsByID };
