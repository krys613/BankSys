import express from 'express';
import async from "async";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {CheckPW} from "../../server/privacy/checkPW";
import {ManageAccount} from "../../server/privacy/manageAccount";
import {EmployeeQuery} from "../../server/data/employee";

var router = express.Router();




router.get('/',function (req,res,next) {
    res.render('employee/loan');
});

router.get('/getAllLoan',function (req,res,next) {
    console.log("---------------------");
    EmployeeQuery.getLoanList(function (err,result) {

        var json = new ObjToJson(result).toJsonRenameWith(["LoanID","Name","Status"],
            ["loanID","customerName","auditingStatus"]);
        res.json (json);
    });
});

module.exports = router;

