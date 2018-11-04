import mysql from 'mysql';

//mysql settings
var env = {
    host:'localhost',
    user:'root',
    password:'qaz123',
    database:'BankSys'
};


module.exports = mysql.createPool(env);
