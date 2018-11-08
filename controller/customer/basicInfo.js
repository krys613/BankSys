import express from 'express';
var router = express.Router();
import async from 'async';
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import pool from '../../model/pool';
import {AccountSql} from '../../model/sqls/account';

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
    console.log(accountNo);
    pool.getConnection(
        function (err,con) {
            con.query(AccountSql.getBalance(accountNo),function (err,result) {
                var json ={
                    balance:result[0].Amount
                };
                res.json(json);
            });
        }
    );

});

module.exports = router;
