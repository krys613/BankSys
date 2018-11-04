import {Encrypt} from "./encrypt";
import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";

//check all privacy
export class ManageAccount {
    constructor(){

    }
    static changeMoney(accountID,ammount,callback){
        pool.getConnection(function (err,con) {
            var resultInfo= {
                match:false
            }
            con.query(AccountSql.updateAccountAmount(Number(accountID),Number(ammount)),function (err,result) {
                if(err){
                    //error
                    console.error(err,"failed sql action.");
                    callback(false);
                }else if(!result){
                    //can not find match account
                    console.error(result,"action failed")
                    callback(resultInfo);
                }else {
                    //work done
                    console.log("action succeed.")
                    resultInfo.match=true
                    callback(resultInfo)
                }
                console.log("change money finished.")
                pool.releaseConnection(con);
            });
        });
    }
    static CreateAccount(userID,password,callback){
        pool.getConnection(function (err,con) {
            var resultInfo = {
                match:false,
                accountID:null
            }
            con.query(AccountSql.isExistedUser(userID),function (err,userNameList) {
                if(err){
                    //error
                    console.error(err,"failed sql action.");
                    callback(newAccount);
                }else if(userNameList.length === 0){
                    //can not find match user
                    console.error("No such user exist.")
                    callback(newAccount);
                }else if(userNameList.length > 0){
                    //find a user
                    var time = today()
                    //UserID,CreatingDate,Password,Amount,Status
                    con.query(AccountSql.creatAccount(userID,time,password,0,1),function (err,result){
                        if(err){
                            console.error(err)
                        }
                        else{
                            con.query("SELECT LAST_INSERT_ID()",function(err,accountID){
                                if(err){
                                    console.error(err)
                                }
                                else{
                                    resultInfo.accountID = accountID[0]['LAST_INSERT_ID()']
                                    resultInfo.match = true
                                    callback(resultInfo);
                                }

                            })
                        }

                    })
                }
                pool.releaseConnection(con);
            });
        });
    }
    static reduceMoney(accountID,ammount,callback){
        pool.getConnection(function (err,con) {
            var resultInfo= {
                match:false
            }
            var t_ammount = Number(ammount)

            con.query(AccountSql.getBalance(Number(accountID)),function (err,balance){
                if(err){
                    //error
                    console.error(err,"failed sql action.");
                    callback(false);
                }else if(!balance){
                    //can not find match account
                    console.error(balance,"reduction failed")
                    callback(resultInfo);
                }else {
                    //work done
                    if(t_ammount+balance[0]["Amount"]<0){
                        console.log("not enough deposit.")
                        callback(resultInfo)
                    }else{
                        console.log("money enough!")
                        ManageAccount.changeMoney(accountID,ammount,function(result){//这里没有串行
                            console.log("reduction succeed.")
                            resultInfo=result
                            callback(resultInfo)
                        })

                    }
                }
                console.log("reduction money finished.")
                pool.releaseConnection(con);
            });
        });
    }





}
function today(){
    var today=new Date(),
        h=today.getFullYear(),
        m=today.getMonth()+1,
        d=today.getDate();
    return h+"-"+m+"-"+d;
}