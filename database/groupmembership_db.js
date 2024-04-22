const pgPool = require('./pg_connection');

async function deleteGM(id) {
    await pgPool.query('DELETE FROM group_membership WHERE idgroup_membership=$1', [id])
}

module.exports = { deleteGM };