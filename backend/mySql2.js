const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "ifsp",
    database: "concessionaria",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;