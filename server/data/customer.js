import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";

export class CustomerQuery{
    constructor(){

    }

    static getAllAccountInfo(userID,callback){
        pool.getConnection(function (err,con) {
            con.query(AccountSql.getAllAccountInfo(userID),function (err,result) {
                if(err){
                    console.error(err);
                }
                pool.releaseConnection(con);
                callback(err,result);
            })
        })
    }
}
