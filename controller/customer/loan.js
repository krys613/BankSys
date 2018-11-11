import express from 'express';
import async from "async";
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {ManageAccount} from "../../server/privacy/manageAccount";
var router = express.Router();


router.post('/applyLoan',function (req,res,next) {
    var query = req.body;

    console.log(query)
    var resultInfo = {
        status: false,
        message: "Fail to add a loan record."
    };
    var temp = Number(query.loanTerm);
    if(temp<5)query.loanTerm="1";
    else if(temp<8)query.loanTerm="5";
    else query.loanTerm="10";
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            //addLoan(name,job,company,monthSalary,loanAmount,accountNo,LoanRate,loanTerm,UserID,callback)
            ManageAccount.addLoan(query.customerName,query.job,query.corporation,
                query.monthlySalary,query.loanAmount,query.cardNumber,query.loanRate,query.loanTerm ,req.session.user.userID, function(accountInfo) {
                callback(null, accountInfo);
            });
        }], function (err, accountInfo) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",query)
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
        json.interestRate = "4.35";
    }else if (term == '6'){
        json.interestRate = "4.75";
    }else {
        json.interestRate = "4.90";
    }
    res.json(json);
});


module.exports = router;
