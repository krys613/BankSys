import express from 'express';
import async from "async";
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
var router = express.Router();



router.get('/getAccount',function (req,res,next) {
    console.log(req.query.accountNo);

});


module.exports = router;
