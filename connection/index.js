const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Bhatara99?',
    database: 'newdatabase'
});

module.export = connection //biar bisa dipakai di file lain