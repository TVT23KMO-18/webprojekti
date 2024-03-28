require('../server/node_modules/dotenv').config();
const {Pool} = require('../server/node_modules/pg');


const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    //ssl: true  <-----  RENDERISSÄ
});

pgPool.connect((err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log("Connected");
    }
});

module.exports = pgPool;