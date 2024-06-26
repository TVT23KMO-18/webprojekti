const pgPool = require("./pg_connection");

const sql = {
  REGISTER: "INSERT INTO users (username, password) VALUES ($1,$2)",
  GET_PASSWORD: "SELECT password FROM users WHERE username=$1",
  GET_USERID: "SELECT iduser FROM users WHERE username=$1",
};

async function register(username, pwHash) {
  try {
    if (!username || !pwHash) {
      throw new Error("Username and password are required");
    }
    await pgPool.query(sql.REGISTER, [username, pwHash]);
  } catch (err) {
    if (err.code === "23505" && err.constraint === "users_username_key") {
      throw new Error("Username already exists");
    } else {
      throw new Error(err.message);
    }
  }
}

async function getPassword(username) {
  const pass = await pgPool.query(sql.GET_PASSWORD, [username]);

  return pass.rowCount > 0 ? pass.rows[0].password : null;
}
async function getUserID(username) {
  try {
    const result = await pgPool.query(sql.GET_USERID, [username]);
    return result.rowCount > 0 ? result.rows[0].iduser : null;
  } catch (err) {
    console.error("Error:", err.message);
    throw new Error(err.message);
  }
}
module.exports = { register, getPassword, getUserID };
