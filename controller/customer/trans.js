import express from 'express';
import async from "async";
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
var router = express.Router();



router.get('/getAccount',function (req,res,next) {
    console.log(req.query.accountNo);

    var json ={
        accountNo:req.query.accountNo
    };
    res.json(json);
});

router.get('/confirmTargetAccount',function (req,res,next) {
    //todo check target account
    var json ={
        name:"test",
        accountNo:req.query.accountNo
    };
    res.json(json);
});

router.post('/confirmTrans',function (req,res,next) {
    //todo confirm trans
    res.json({test:"test"})
});

module.exports = router;
