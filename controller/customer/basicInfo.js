import express from 'express';
var router = express.Router();
import async from 'async';
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";

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

module.exports = router;
