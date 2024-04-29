const pgPool = require("./pg_connection");

const sql = {
  GET_ALL_USERS: "SELECT username FROM users",
  GET_USERNAME: "SELECT username FROM users WHERE iduser=$1",
  ADD_USER: "INSERT INTO users (username,password) VALUES ($1,$2)",
  GET_iduser: "SELECT iduser FROM users WHERE username=$1",
};

async function getUsers() {
  let result = await pgPool.query(sql.GET_ALL_USERS);

  return result.rows;
}

async function getOneUser(iduser) {
  let result = await pgPool.query(sql.GET_USERNAME, [iduser]);
  if (result.rows.length === 0) {
    throw new Error("Käyttäjää ei löydy");
  }
  return result.rows;
}

async function addUser(username, password) {
  try {
    await pgPool.query(sql.ADD_USER, [iduser, username, password]);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteUser(username) {
  try {
    const result = await pgPool.query(
      "SELECT iduser FROM users WHERE username=$1",
      [username]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    const idUser = result.rows[0].iduser;
    await pgPool.query("DELETE FROM favorites WHERE iduser=$1", [idUser]);
    const groupMembershipResult = await pgPool.query(
      "SELECT idgroup FROM group_membership WHERE iduser=$1",
      [idUser]
    );
    const idGroups = groupMembershipResult.rows.map((row) => row.idgroup);
    await pgPool.query("DELETE FROM group_membership WHERE iduser=$1", [
      idUser,
    ]);
    for (const idGroup of idGroups) {
      const owner = await pgPool.query(
        'SELECT owner FROM "group" WHERE idgroup=$1',
        [idGroup]
      );
      if (username == owner.rows[0].owner) {
        await pgPool.query('DELETE FROM "group" WHERE idgroup=$1', [idGroup]);
        await pgPool.query('DELETE FROM group_membership WHERE idgroup=$1', [idGroup]);
      }
    }
    await pgPool.query("DELETE FROM reviews WHERE iduser=$1", [idUser]);
    await pgPool.query("DELETE FROM users WHERE iduser=$1", [idUser]);
  } catch (err) {
    throw err;
  }
}
async function nameToUserId(username) {
  try {
    let result = await pgPool.query(sql.GET_iduser, [username]);
    return result.rows;
  } catch (error) {
    console.error("Error in nameToUserId:", error);
    throw error;
  }
}

module.exports = { getUsers, getOneUser, addUser, deleteUser, nameToUserId };
