const mySql = require('mysql2/promise');
const env = require('dotenv');
// implement the env vr
env.config();

const connection =  mySql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

module.exports = connection;