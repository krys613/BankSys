import mysql from 'mysql';

//mysql settings
var env = {
    host:'localhost',
    user:'root',
    password:'1234',
    database:'BankSys'
};


module.exports = mysql.createPool(env);
