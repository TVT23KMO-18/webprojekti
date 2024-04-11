const pgPool = require('./pg_connection');

async function getGroups(username) {
    let user = await pgPool.query('SELECT iduser FROM users WHERE username=$1', [username]);
    let idUser = user.rows[0].iduser;
    let result = await pgPool.query('SELECT g.groupname ' +
    'FROM group_membership gm ' +
    'JOIN "group" g ON gm.idgroup = g.idgroup ' +
    'WHERE gm.iduser = $1', [idUser])

    return result.rows
}

async function createGroup(username, groupname) {
    let user = await pgPool.query('SELECT iduser FROM users WHERE username=$1', [username]);
    let idUser = user.rows[0].iduser;
    await pgPool.query('INSERT INTO "group" (groupname) VALUES ($1)', [groupname]);
    let result = await pgPool.query('SELECT idgroup FROM "group" WHERE groupname=$1', [groupname]);
    let idGroup = result.rows[0].idgroup;
    await pgPool.query('INSERT INTO "group_membership" (iduser, idgroup) VALUES($1,$2)', [idUser, idGroup])
}


module.exports = { getGroups, createGroup }