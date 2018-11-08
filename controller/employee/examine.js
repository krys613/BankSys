import express from 'express';
import async from "async";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {CheckPW} from "../../server/privacy/checkPW";
import {ManageAccount} from "../../server/privacy/manageAccount";

var router = express.Router();




router.get('/',function (req,res,next) {
    res.render('employee/loan');
});



module.exports = router;

