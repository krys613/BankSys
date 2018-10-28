import {Encrypt} from "./encrypt";
import pool from '../../model/pool';
import {LoginSql} from "../../model/sqls/login";

//check all privacy
export class CheckPW {
    constructor(){

    }

    static checkLogin(userID,type,pw,callback){
        pool.getConnection(function (err,con) {
            var match = true;
            var user = null;
            con.query(LoginSql.getUser(userID),function (err,result) {
                if(err){
                    match = false;
                    console.error(err);
                }else if(result.length === 0){
                    //can not find match user
                    match = false;
                }else {
                    //todo : logic error(set userID as primary key)
                    //find user
                    //check type
                    if(type !== result[0].type){

                        match = false;
                    }
                    //check privacy
                    if(pw !== result[0].password){
                        //todo : replace with encrypt while register page finished
                        match = false;
                    }
                    if(match){
                        user = {
                            userID:result[0].userID,
                            name:result[0].name,
                            type:result[0].type
                        }
                    }
                }
                pool.releaseConnection(con);
                console.log("match "+match);
                callback(match,user);
            });
        });
    }
}
