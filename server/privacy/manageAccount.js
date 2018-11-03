import {Encrypt} from "./encrypt";
import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";

//check all privacy
export class ManageAccount {
    constructor(){

    }

    static CreateAccount(userID,password,callback){
        pool.getConnection(function (err,con) {
            var newAccount = {
                match:false,
                accountID:null
            }

            con.query(AccountSql.isExistedUser(userID),function (err,userNameList) {
                if(err){
                    //error
                    console.error(err);

                }else if(userNameList.length === 0){
                    //can not find match user
                    console.log("No such user exist.")
                }else if(userNameList.length > 0){
                    //find a user
                    var date = new Date()
                    var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
                    //UserID,CreatingDate,Password,Amount,Status
                    con.query(AccountSql.creatAccount(userID,time,password,0,1),function (err,result){
                        con.query("SELECT LAST_INSERT_ID()",function(err,accountID){
                            newAccount.accountID = accountID[0]['LAST_INSERT_ID()']
                            newAccount.match = true
                            callback(newAccount);
                        })

                    })

                }
                pool.releaseConnection(con);
            });
        });
    }


}
