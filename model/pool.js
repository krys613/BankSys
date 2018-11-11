import mysql from 'mysql';

//mysql settings
var env = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'BankSys'
};


module.exports = mysql.createPool(env);
