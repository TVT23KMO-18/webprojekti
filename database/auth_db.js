const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO users (username, password) VALUES ($1,$2)',
    GET_PASSWORD: 'SELECT password FROM users WHERE username=$1'
}

async function register(username, pwHash) {
    await pgPool.query(sql.REGISTER, [username, pwHash]);

}

async function getPassword(username) {
    const pass = await pgPool.query(sql.GET_PASSWORD, [username]);

    return pass.rowCount > 0 ? pass.rows[0].password : null;
}

module.exports = {register, getPassword};