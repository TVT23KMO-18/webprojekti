const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_USERS: 'SELECT username FROM users',
    GET_USERNAME: 'SELECT username FROM users WHERE iduser=$1',
    ADD_USER: 'INSERT INTO users (username,password) VALUES ($1,$2)',
}

async function getUsers() {
    let result = await pgPool.query(sql.GET_ALL_USERS)

    return result.rows
}

async function getOneUser(iduser) {
    let result = await pgPool.query(sql.GET_USERNAME, [iduser])

    return result.rows
}

async function addUser(username, password) {
    try {
        await pgPool.query(sql.ADD_USER, [iduser, username, password])
    } catch(err) {
        console.log(err.message)
    }
}

async function deleteUser(username) {
    try {  
        const iduser = (await pgPool.query('SELECT iduser FROM users WHERE username=$1', [username])).rows[0].iduser
        await pgPool.query('DELETE FROM favourites WHERE iduser=$1', [iduser])
        await pgPool.query('DELETE FROM group_membership WHERE iduser=$1', [iduser])
        await pgPool.query('DELETE FROM reviews WHERE iduser=$1', [iduser])
        await pgPool.query('DELETE FROM users WHERE iduser=$1', [iduser])
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = {getUsers, getOneUser, addUser, deleteUser}