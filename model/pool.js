import mysql from 'mysql';

//mysql settings
var env = {
    host:'localhost',
    user:'root',
    password:'136483852',
    database:'BankSys'
};


module.exports = mysql.createPool(env);
