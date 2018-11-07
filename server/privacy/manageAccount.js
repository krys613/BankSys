import {Encrypt} from "./encrypt";
import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";
import {TransactionSql} from "../../model/sqls/transaction";
import async from "async";
import {transferAffairSql} from "../../model/sqls/transaction";


//check all privacy
export class ManageAccount {
    constructor(){

    }

    static changeMoney(accountID,ammount,callback){
        var resultInfo= {
            match:false
        }
        var t_amount = Number(ammount)
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },
            function(con, callback){
                con.query(AccountSql.getBalance(Number(accountID)),function (err,status){
                    if(err){
                        console.error(err)
                    }else{
                        if(status[0]["Status"] == '0'){
                            console.error("The account has been frozen!!!")
                            callback(null,resultInfo)
                        }
                        else if(status[0]["Amount"]+t_amount<0){
                            console.error("The account doesn't have enough deposit!!!")
                            callback(null,resultInfo)
                        }
                        else{
                            console.log("dealing with changing money...")
                            resultInfo.match = true
                            callback(null,con)
                        }

                    }
                })
            },
            function(con,callback){
                if(resultInfo.match == false){
                    callback(null,con)
                }else{
                    con.query(AccountSql.updateAccountAmount(Number(accountID),Number(ammount)),function(err,result) {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log("changing money successfully!")
                            callback(null,con)
                        }
                    })
                }
            }],function (err,con) {
                pool.releaseConnection(con);
                if(err){
                    console.log(err)
                }else{
                    console.log("changing money finished")
                    callback(resultInfo)
                }
            })
        }
    static save_record(AccountNo,Amount,callback){
        pool.getConnection(function (err,con) {
            var resultInfo = {
                match:false,
                Status:null,
                trans_save_ID:null
            }
            if(err){
                console.error(err)
            }
            else {
                console.log("dealing with recording...")
                var time = today()
                //AccountNo,date,Amount,Description
                con.query(TransactionSql.deposit(AccountNo, time, Amount), function (err, result) {
                    if (err) {
                        console.error(err)
                    }
                    else {
                        con.query("SELECT LAST_INSERT_ID()", function (err, transID) {
                            if (err) {
                                console.error(err)
                            }
                            else {
                                console.log("save record successfully!")
                                resultInfo.trans_save_ID = transID[0]['LAST_INSERT_ID()']
                                resultInfo.match = true
                                resultInfo.Status = true
                                callback(resultInfo);
                            }
                        })
                    }
                })
                pool.releaseConnection(con);
            }
        })
    }
    static withdrawal_record(AccountNo,Amount,callback){
        Amount = -Number(Amount)
        pool.getConnection(function (err,con) {
            var resultInfo = {
                match:false,
                Status:null,
                trans_save_ID:null
            }
            if(err){
                console.error(err)
            }
            else{
                console.log("dealing with recording...")
                var time = today()
                con.query(TransactionSql.withdraw(Number(AccountNo),time,Amount),function (err,result){
                    if(err){
                        console.error(err)
                    }
                    else{
                        con.query("SELECT LAST_INSERT_ID()",function(err,transID){
                            if(err){
                                console.error(err)
                            }
                            else{
                                console.log("withdrawal record successfully!")
                                resultInfo.trans_save_ID = transID[0]['LAST_INSERT_ID()']
                                resultInfo.match = true
                                resultInfo.Status = true
                                callback(resultInfo);
                            }
                        })
                    }
                })
            }
            pool.releaseConnection(con);
        });
    }
    // static transfer_record(Account_from,Account_to,Amount,callback){
    //     pool.getConnection(function (err,con) {
    //         var resultInfo = {
    //             match:false,
    //             Status:null,
    //             trans_save_ID:null
    //         }
    //         if(err){
    //             console.error(err)
    //         }
    //         else{
    //             console.log("dealing with recording...")
    //             var time = today()
    //             con.query(TransactionSql.withdraw(Number(AccountNo),time,Amount),function (err,result){
    //                 if(err){
    //                     console.error(err)
    //                 }
    //                 else{
    //                     con.query("SELECT LAST_INSERT_ID()",function(err,transID){
    //                         if(err){
    //                             console.error(err)
    //                         }
    //                         else{
    //                             console.log("withdrawal record successfully!")
    //                             resultInfo.trans_save_ID = transID[0]['LAST_INSERT_ID()']
    //                             resultInfo.match = true
    //                             resultInfo.Status = true
    //                             callback(resultInfo);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //         pool.releaseConnection(con);
    //     });
    // }
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
                    callback(resultInfo);
                }else if(userNameList.length === 0){
                    //can not find match user
                    console.error("No such user exist.")
                    callback(resultInfo);
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
    static addMoney(accountID,ammount,callback){
        var resultInfo= {
            match:false
        }
        ManageAccount.changeMoney(accountID,ammount,function(result){
            if(result.match!=true){
                console.log("Addition failed")
                callback(result)
            }else{
                ManageAccount.save_record(accountID,ammount,function(condition_for_recording){
                    if(condition_for_recording.trans_save_ID!=null){
                        console.log("Deposit record successfully!")
                        resultInfo.match = true
                    }else{
                        console.error("failed to record deposition!")
                    }
                    callback(resultInfo)
                })

            }
        })
    }
    static reduceMoney(accountID,ammount,callback){
        var resultInfo= {
            match:false
        }
        ammount = -Number(ammount)
        ManageAccount.changeMoney(accountID,ammount,function(result){//这里没有串行
            if(result.match == false){
                callback(resultInfo)
            }else{
                ManageAccount.withdrawal_record(accountID,ammount,function(condition_for_recording){
                    if(condition_for_recording.trans_save_ID!=null){
                        console.log("reduce successfully!")
                        resultInfo.match = true
                    }else{
                        console.error("failed to record withdrawal!")
                    }
                    callback(resultInfo)
                })
            }
        })
        console.log("reduction money finished.")
    }

    // static transferMoney(accountID_from,accountID_to,ammount,callback){
    //     pool.getConnection(function (err,con) {
    //         var resultInfo= {
    //             match:false
    //         }
    //
    //         async.waterfall([
    //             function(callback) {
    //                 con.query(transferAffairSql.transfer(123,321,),function (err,balance){
    //
    //                 callback(null, 'one', 'two');
    //             },
    //             function(arg1, arg2, callback) {
    //                 // arg1 now equals 'one' and arg2 now equals 'two'
    //                 callback(null, 'three');
    //             },
    //             function(arg1, callback) {
    //                 // arg1 now equals 'three'
    //                 callback(null, 'done');
    //             }
    //         ], function (err, result) {
    //             // result now equals 'done'
    //         });
    //
    //
    //
    //         con.query(AccountSql.getBalance(Number(accountID_from)),function (err,balance){
    //             if(err){
    //                 //error
    //                 console.error(err,"failed sql action.");
    //                 callback(false);
    //             }else if(!balance){
    //                 //can not find match account
    //                 console.error(balance,"reduction failed")
    //                 callback(resultInfo);
    //             }else {
    //                 //work done
    //                 if(t_ammount+balance[0]["Amount"]<0){
    //                     console.log("not enough deposit.")
    //                     callback(resultInfo)
    //                 }else{
    //                     console.log("money enough!")
    //                     ManageAccount.changeMoney(accountID,ammount,function(result){//这里没有串行
    //                         console.log("changing money succeed.")
    //                         ManageAccount.withdrawal_record(accountID,-ammount,function(condition_for_recording){
    //                             if(condition_for_recording.trans_save_ID!=null){
    //                                 console.log("Withdrawal record successfully!")
    //                                 resultInfo=result
    //                             }else{
    //                                 console.error("failed to record withdrawal!")
    //                             }
    //                             callback(resultInfo)
    //                         })
    //
    //                     })
    //
    //                 }
    //             }
    //             console.log("reduction money finished.")
    //             pool.releaseConnection(con);
    //         });
    //     });
    // }




}
function today(){
    var today=new Date(),
        h=today.getFullYear(),
        m=today.getMonth()+1,
        d=today.getDate();
    return h+"-"+m+"-"+d;
}