const pgPool = require("./pg_connection");

async function getGroups(username) {
  let user = await pgPool.query("SELECT iduser FROM users WHERE username=$1", [
    username,
  ]);
  let idUser = user.rows[0].iduser;
  let result = await pgPool.query(
    "SELECT g.idgroup, g.groupname " +
      "FROM group_membership gm " +
      'JOIN "group" g ON gm.idgroup = g.idgroup ' +
      "WHERE gm.iduser = $1",
    [idUser]
  );

  return result.rows;
}

async function getUsersFromGroup(idgroup) {
  let usernames = [];
  let result = await pgPool.query(
    "SELECT iduser FROM group_membership WHERE idgroup=$1",
    [idgroup]
  );
  const idUsers = result.rows;
  for (user of idUsers) {
    console.log(user.iduser);
    let queryResult = await pgPool.query(
      "SELECT username FROM users WHERE iduser=$1",
      [user.iduser]
    );
    usernames.push(queryResult.rows[0].username);
  }
  return usernames;
}

async function getOwner(idgroup) {
  let result = await pgPool.query(
    'SELECT owner FROM "group" WHERE idgroup=$1',
    [idgroup]
  );
  return result.rows[0].owner;
}

async function allGroups() {
  let result = await pgPool.query(
    'SELECT idgroup, groupname, description FROM "group"'
  );
  return result.rows;
}

async function createGroup(username, groupname, description) {
  let user = await pgPool.query("SELECT iduser FROM users WHERE username=$1", [
    username,
  ]);
  let idUser = user.rows[0].iduser;
  await pgPool.query(
    'INSERT INTO "group" (groupname, description, owner) VALUES ($1,$2,$3)',
    [groupname, description, username]
  );
  let result = await pgPool.query(
    'SELECT idgroup FROM "group" WHERE groupname=$1',
    [groupname]
  );
  let idGroup = result.rows[0].idgroup;
  await pgPool.query(
    'INSERT INTO "group_membership" (iduser, idgroup) VALUES($1,$2)',
    [idUser, idGroup]
  );
}

async function allUsernameGroups(username) {
  let user = await pgPool.query("SELECT iduser FROM users WHERE username=$1", [
    username,
  ]);
  let idUser = user.rows[0].iduser;
  let result = await pgPool.query(
    'SELECT idgroup, groupname, "description" FROM "group" WHERE idgroup NOT IN (SELECT idgroup FROM group_membership WHERE iduser = $1)',
    [idUser]
  );
  return result.rows;
}

async function deleteGroup(id) {
  await pgPool.query('DELETE FROM "group" WHERE idgroup=$1', [id]);
  await pgPool.query('DELETE FROM group_membership WHERE idgroup = $1', [id]);
}

async function deleteUser(username, idgroup) {
  let result = await pgPool.query(
    "SELECT iduser FROM users WHERE username=$1",
    [username]
  );
  let user = result.rows[0].iduser;
  await pgPool.query(
    "DELETE FROM group_membership WHERE idgroup=$1 AND iduser=$2",
    [idgroup, user]
  );
}
async function getGroupsByOwner(owner) {
  try {
    const query = `
          SELECT *
          FROM "group"
          WHERE owner = $1
        `;

    const result = await pgPool.query(query, [owner]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching requests", error);
    throw error;
  }
}

module.exports = {
  getGroups,
  createGroup,
  allGroups,
  allUsernameGroups,
  deleteGroup,
  getUsersFromGroup,
  getOwner,
  deleteUser,
  getGroupsByOwner,
};
