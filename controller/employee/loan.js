import express from 'express';
var router = express.Router();
import async from 'async';
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import pool from '../../model/pool';
import {AccountSql} from '../../model/sqls/account';
import {EmployeeQuery} from "../../server/data/employee";
import {ManageAccount} from "../../server/privacy/manageAccount";

router.get('/getAccounts',function (req,res,next) {
    async.waterfall([
        function (callback) {
            CustomerQuery.getAllAccountInfo(req.session.user.userID,function (err,accounts) {
                callback(null,accounts);
            })
        }
    ],function (err,accounts) {
        var json = new ObjToJson(accounts).toJson();
        res.json(json);
    });
});

router.post('/getBalance',function (req,res) {
    var accountNo = req.body.accountNo;

    pool.getConnection(
        function (err,con) {
            con.query(AccountSql.getBalance(accountNo),function (err,result) {
                var json ={
                    balance:result[0]
                };
                res.json(json);
            });
        }
    );

});

router.post('/getAllLoan',function (req,res,next) {
    EmployeeQuery.getLoanList(function (err,result) {

        var json = new ObjToJson(result).toJsonRenameWith(["LoanID","Name","Status"],
                                                    ["loanID","customerName","auditingStatus"]);
        res.json (json);
    });
});

router.get('/getOneLoan',function (req,res,next) {
    ManageAccount.getOneLoan(req.query.loanID, function (result) {
        res.json(result);
    });
});

router.post('/commitAuditing',function (req,res,next) {
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to check loan."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.checkloan(req.body.loanID,req.body.auditingStatus, function(accountInfo,list) {
                callback(null, accountInfo);
            });
        }], function (err, accountInfo) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            if(accountInfo.match) {
                resultInfo.message = "Check loan info successfully."
                resultInfo.status = true
            }
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
});
module.exports = router;
