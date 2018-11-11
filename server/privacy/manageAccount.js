import {Encrypt} from "./encrypt";
import pool from '../../model/pool';
import {AccountSql} from "../../model/sqls/account";
import {TransactionSql} from "../../model/sqls/transaction";
import async from "async";
import {loanSql} from "../../model/sqls/loan";

//check all privacy
export class ManageAccount {
    constructor(){

    }

    static changeMoney(accountID,ammount,callback){
        var resultInfo= {
            match:false
        };
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
                        if(status.length == 0){
                            console.error("No such an Account existed!!!")
                            callback(null,resultInfo)
                        }else if(status[0]["Status"] == '0'){
                            console.error("The account has been frozen!!!")
                            callback(null,resultInfo)
                        }
                        else if(status[0]["Amount"]+t_amount<0){
                            console.error("The account doesn't have enough deposit!!!")
                            callback(null,resultInfo)
                        }
                        else {
                            console.log("dealing with changing money...")
                            resultInfo.match = true
                            callback(null, con)
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
                callback(resultInfo)
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
    static getOneLoan(loanID,callback){
        pool.getConnection(function (err,con) {
            con.query(loanSql.getOneLoan(loanID),function (err,loanInfo) {
                callback(loanInfo);
                pool.releaseConnection(con);
            });
        });
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
    static transferMoney(accountID_from,accountID_to,nameFrom,nameTo,ammount,callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                con.query(AccountSql.getUserID(nameFrom),function (err,user_id) {
                    if(err){
                        console.error(err)
                    }else{
                        if(user_id.length == 0){
                            console.error("There is no such a user of sending!")
                            callback(1,con)
                        }else{
                            console.log(user_id)
                            console.log(("Get userID_from successfully."))
                            callback(null,con,user_id[0]["userID"])
                        }
                    }
                })
            },function (con,user_id,callback) {
                con.query(AccountSql.check_with_Account_UserID(user_id,Number(accountID_from)),function (err,sta) {
                    if(err){
                        console.error(err)
                    }else{
                        if(sta.length != 0){
                            if(sta[0]["Status"]==0){
                                console.error("The account of sending has been frozen!")
                                callback(1,con)
                            }else{
                                console.log(("Check User_From and Account_From successfully."))
                                callback(null,con)
                            }
                        }else{
                            console.error("The account of sending doesn't exist!")
                            callback(1,con)
                        }
                    }
                })
            },function (con,callback) {
                con.query(AccountSql.getUserID(nameTo),function (err,user_id) {
                    if(err){
                        console.error(err)
                    }else{
                        if(user_id.length == 0){
                            console.error("There is no such a user of receiving!")
                            callback(1,con)
                        }else{
                            console.log(user_id)
                            console.log(("Get userID_to successfully."))
                            callback(null,con,user_id[0]["userID"])
                        }
                    }
                })
            },function (con,user_id,callback) {
                con.query(AccountSql.check_with_Account_UserID(user_id,Number(accountID_to)),function (err,sta) {
                    if(err){
                        console.error(err)
                    }else{
                        if(sta.length != 0){
                            if(sta[0]["Status"]==0){
                                console.error("The account of receiving has been frozen!")
                                callback(1,con)
                            }else{
                                console.log(("Check User_to and Account_to successfully."))
                                callback(null,con)
                            }
                        }else{
                            console.error("The account of receiving doesn't exist!")
                            callback(1,con)
                        }
                    }
                })
            },function (con,callback) {
                var time = today()
                con.query(AccountSql.transfer(Number(accountID_from), Number(accountID_to), time, Number(ammount)), function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (result[0][0]["transRecordNo"] != null) {
                            resultInfo.match = true
                            console.log("Transfer money successfully. Transfer Record number is " + result[0][0]["transRecordNo"])
                            callback(null,con)
                        } else {
                            console.log("Transfer money can't succeed in Mysql.")
                            callback(null,con)
                        }

                    }
                })
            }],function(err,con){
                callback(resultInfo)
                console.log("Transfer money finished.")
                pool.releaseConnection(con);
            }
        )
    }


    static addLoan(name,job,company,monthSalary,loanAmount,accountNo,LoanRate,loanTerm,UserID,callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                con.query(AccountSql.getBalance(accountNo),function (err,status) {
                    if(err){
                        console.log(err);
                    }else{
                        if(status.length == 0){
                            console.log("no such an account exists.")
                            callback(1,con)
                        }else{
                            if(status[0]["Status"]==0){
                                console.log("The account has been frozen!")
                                callback(1,con)
                            }else{
                                console.log("The account is available.")
                                callback(null,con)
                            }
                        }
                    }
                })
            },function (con,callback) {
                var today=new Date(),
                    h=today.getFullYear(),
                    m=today.getMonth()+2,
                    d=today.getDate();
                if(m>12)h=1+h;
                var PassDate= h+"-"+m+"-"+d;
            //insertLoan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,UserID,Status,LoanTerm,PassDate,FinishedAmount)
                con.query(loanSql.insertLoan(accountNo,name,job,company,monthSalary,loanAmount,Number(LoanRate),UserID,0,loanTerm,PassDate,0),function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Add a loan record successfully.")
                        resultInfo.match=true
                        callback(null,con)
                    }
                })
            }],function(err,con){
                callback(resultInfo);
                console.log("Loan money finished.")
                pool.releaseConnection(con);
        })

    }

    static listAllLoan(callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                //insertLoan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,Status,LoanTerm,PassDate,FinishedAmount)
                con.query(loanSql.showAllLoan(),function (err,list) {
                    if(err){
                        console.log(err);
                    }else{
                        if(list.length == 0){
                            console.log("No loan record exists.")
                            resultInfo.match = true
                            callback(1,list,con)
                        }else{
                            console.log("Get all loan record info")
                            callback(null,list,con)
                            resultInfo.match = true
                        }
                    }
                })
            }],function(err,list,con){
            callback(resultInfo,list)
            console.log("Loan money finished.")
            pool.releaseConnection(con);
        })
    }
    static listOneUserLoan(UserID,callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                //insertLoan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,Status,LoanTerm,PassDate,FinishedAmount)
                con.query(loanSql.showSingleUser(UserID),function (err,list) {
                    if(err){
                        console.log(err);
                    }else{
                        if(list.length == 0){
                            console.log("No loan record exists.")
                        }else{
                            console.log("Get all loan record info")
                        }
                        resultInfo.match = true
                        callback(null,list,con)
                    }
                })
            }],function(err,list,con){
            callback(resultInfo,list)
            console.log("Loan money finished.")
            pool.releaseConnection(con);
        })
    }

    static checkloan(LoanID,status,callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                con.query(loanSql.getLoanAggregate(LoanID),function (err,aggre) {
                    if(err){
                        console.log(err);
                    }else{
                        if(aggre.length == 0){
                            console.log("No such an loan existed.")
                            callback(1,con)
                        }else{
                            console.log("The loan exist.")
                            callback(null,con)
                        }
                    }
                })
            },function (con,callback) {
                con.query(loanSql.updateStatus(LoanID,status),function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Update the loan successfully.")
                        resultInfo.match = true
                        callback(null,con)
                    }
                })
            }],function(err,con){
            callback(resultInfo)
            console.log("Update loan status finished.")
            pool.releaseConnection(con);
        })
    }

    static paymentLoan(LoanID,callback){
        var resultInfo= {
            match:false
        };
        async.waterfall([
            function (callback){
                pool.getConnection(function(err,con) {
                    if (err) {
                        console.error(err)
                    } else {
                        callback(null, con)
                    }
                })
            },function (con,callback) {
                con.query(loanSql.getLoanAggregate(LoanID),function (err,condition) {
                    if(err){
                        console.log(err);
                    }else{
                        if(condition.length == 0){
                            console.log("No such an loan existed.")
                            callback(1,con)
                        }else{
                            if(condition[0]["Status"]!=2){
                                console.log("The loan is not available!")
                                callback(1,con)
                            }else{
                                console.log("The loan exist.")
                                callback(null,con,condition)
                            }
                        }
                    }
                })
            },function (con,condition,callback) {
                con.query(AccountSql.getBalance(condition[0]["AccountNo"]),function (err,balance) {
                    if(err){
                        console.log(err);
                    }else{
                        if(balance[0]["Status"]==0){
                            console.log("The account is not available.")
                            callback(1,con)
                        }else {
                            var payment = condition[0]["Amount"]/condition[0]["LoanTerm"];
                            console.log(payment)
                            console.log(condition[0]["Amount"])
                            if(balance[0]["Amount"] >= payment){
                                console.log("There is enough balance.")
                                callback(null,con,payment,condition)
                            }else{
                                console.log("The balance is not enough.")
                                callback(1,con)
                            }
                        }
                    }
                })
            },function (con,payment,condition,callback) {
                con.query(loanSql.updateLoan(LoanID,payment),function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Payment the loan successfully.")
                        resultInfo.match = true
                        callback(null,payment,condition,con)
                    }
                })
            },function (payment,condition,con,callback) {
                con.query(AccountSql.updateAccountAmount(condition[0]["AccountNo"],0-payment),function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Reduce the account successfully.")
                        resultInfo.match = true
                        callback(null,con)
                    }
                })
            }],function(err,con){
            callback(resultInfo);
            console.log("Payment loan finished.");
            pool.releaseConnection(con);
        })
    }
}
function today(){
    var today=new Date(),
        h=today.getFullYear(),
        m=today.getMonth()+1,
        d=today.getDate();
    return h+"-"+m+"-"+d;
}
