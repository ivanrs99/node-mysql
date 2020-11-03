const mysql = require('mysql');
const { database } = require('./keys'); //solo recibo el parametro database, que es el que interesa aquí
const { promisify } = require('util'); //convertir callbacks en promesas
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }else if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query); //convirtiendo callbacks en promesas

module.exports = pool;