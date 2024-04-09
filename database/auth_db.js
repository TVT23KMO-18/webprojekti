const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO users (username, password) VALUES ($1,$2)',
    GET_PASSWORD: 'SELECT password FROM users WHERE username=$1'
}


async function register(username, pwHash) {
    try {
        await pgPool.query(sql.REGISTER, [username, pwHash]);
    } catch (err) {
        if (err.code === '23505' && err.constraint === 'users_username_key') {
            console.log("Duplicate username error:", err.message);
            throw new Error('Username already exists');
        } else {
            console.error("Other error:", err.message);
            throw new Error(err.message);
        }
    }
}

async function getPassword(username) {
    const pass = await pgPool.query(sql.GET_PASSWORD, [username]);

    return pass.rowCount > 0 ? pass.rows[0].password : null;
}

module.exports = {register, getPassword};