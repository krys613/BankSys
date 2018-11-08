import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";
import {loanSql} from "../../model/sqls/loan";

export class EmployeeQuery{
    constructor(){

    }

    static getLoanList(callback){
        pool.getConnection(function (err,con) {
            con.query(loanSql.showAllLoan(),function (err,result) {
               if (err){
                   console.log(err);
               }
               pool.releaseConnection(con);
               callback(err,result);
            });
        })
    }
}
