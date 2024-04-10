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

module.exports = { getGroups }