import express from 'express';
import async from "async";
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {ManageAccount} from "../../server/privacy/manageAccount";
var router = express.Router();


router.post('/applyLoan',function (req,res,next) {
    var query = req.body;

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to add a loan record."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            //(name,job,company,monthSalary,loanAmount,accountNo,loanTerm,UserID,callback)
            ManageAccount.addLoan(query.customerName,query.job,query.corporation,
                query.monthlySalary,query.loanAmount,query.cardNumber,query.loanTerm ,req.session.user.userIDr, function(accountInfo) {
                callback(null, accountInfo);
            });
        }], function (err, accountInfo) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            resultInfo.status = accountInfo.match;
            resultInfo.message = "transfer successfully."
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
});

router.post('/payLoan',function (req,res,next) {
    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to payment."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.paymentLoan(req.body.loanId, function(accountInfo,list) {
                callback(null, accountInfo);
            });
        }], function (err, accountInfo) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            if(accountInfo.match) {
                resultInfo.message = "Payment loan successfully."
                resultInfo.status = true
            }
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
});

router.get('/getRate',function (req,res,next) {
    var json = {
        interestRate:""
    };
    var term = req.query.loanTerm;
    console.log(term);
    if(term == '3'){
        json.interestRate = "1";
    }else if (term == '6'){
        json.interestRate = "5";
    }else {
        json.interestRate = "10";
    }
    res.json(json);
});


module.exports = router;
