import express from 'express';
var router = express.Router();
import async from 'async';
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import pool from '../../model/pool';
import {AccountSql} from '../../model/sqls/account';
import {EmployeeQuery} from "../../server/data/employee";

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
    console.log("---------------------");
    EmployeeQuery.getLoanList(function (err,result) {

        var json = new ObjToJson(result).toJsonRenameWith(["LoanID","Name","Status"],
                                                    ["loanID","customerName","auditingStatus"]);
        res.json (json);
    });
});

module.exports = router;
