const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'projectone',
    password: 'CUkmkc@69'
});

module.exports = pool.promise();