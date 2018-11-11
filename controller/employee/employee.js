import express from 'express';
import async from "async";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {CheckPW} from "../../server/privacy/checkPW";
import {ManageAccount} from "../../server/privacy/manageAccount";

var router = express.Router();
var LOANRATE = [4.35,4.75,4.9];

//page

router.get('/', function(req, res, next) {

    if(req.session.user.name != null && req.session.user.type === "employee"){
        //todo tougher check
        res.render('employee/employee',{
            name:req.session.user.name
        });
    }else {
        res.send("no user");
    }

});

router.get('/ggg',function (req,res,next) {
    var test ={
        test:"hahahahhaha"
    }
    res.json(test);
});


router.get('/deposit',function (req,res,next) {
    res.render('employee/deposit');
});

router.get('/draft',function (req,res,next) {
    res.render('employee/draft');
});

router.get('/home',function (req,res,next) {
    res.render('employee/home');
});

router.get('/trans',function (req,res,next) {
    res.render('employee/trans');
});

router.get('/loan',function (req,res,next) {
    res.render('employee/loan');
});

router.get('/withdrawal',function (req,res,next) {
    res.render('employee/withdrawal');
});

//创建账户
router.post('/applyForAccount',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var json = {
        status: false,
        message:null
    };

    async.waterfall([
        function(callback){//一个callback对应再往下的一个callback
            ManageAccount.CreateAccount(applicant.custID,applicant.PassWord,function (accountInfo) {//userInfo和下一行的accountInfo对应
                callback(null,accountInfo);//userInfo接收CreateAccount函数的返回值
            });
        }
    ],function (err,accountInfo) {//和前1行的accountInfo对应
        if(err){
            console.error("Error at CreateAccount.")
                console.error("Reveived Info:",applicant)
        }
        else{
            json.status = accountInfo.match;
            json.message = accountInfo.accountID
        }
        res.json(json);
    });
});

//存款
/*router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message:"Fail to deposit."
    };

    async.waterfall([
        function(callback){//一个callback对应再往下的一个callback
            ManageAccount.addMoney(applicant.AccountNo,applicant.Amount,function(accountInfo){
                console.log(accountInfo)
                callback(null,accountInfo);//userInfo接收CreateAccount函数的返回值
            });

        }
    ],function (err,accountInfo) {//和前1行的accountInfo对应
        if(err){
            console.error("Error deposit at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else{
            resultInfo.status = accountInfo.match;
            resultInfo.message = "Deposit successfully."
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
});*/

//转账
router.post('/trans/commitTrans',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to transfer."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.transferMoney(applicant.AccountNoFrom, applicant.AccountNoTo,
                applicant.nameFrom,applicant.nameTo,applicant.Amount, function(accountInfo) {/*("123482", "123481","dsad","dsad","12", function(accountInfo) {*/
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
})

//取款
router.post('/withdrawal/commitWithdrawal',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message:"Fail to withdrawal."
    };
    async.waterfall([
        function(callback){//一个callback对应再往下的一个callback
            ManageAccount.reduceMoney(applicant.AccountNo,applicant.Amount,function(accountInfo){
                callback(null,accountInfo);
            });
        }],function (err,accountInfo) {//和前1行的accountInfo对应
            if(err){
                console.error("Error Withdrawal at sql return.")
                console.error("Reveived Info from interface: ",applicant)
            }
            else{
                resultInfo.status = accountInfo.match;
                resultInfo.message = "withdraw successfully."
            }
            res.status(resultInfo.status?200:500).json(resultInfo);
        });

});

//贷款
/*
router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to add a loan record."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
        //(name,job,company,monthSalary,loanAmount,accountNo,loanRate,loanTerm,UserID,callback)
            ManageAccount.addLoan("dasd","s","Ali","100000","10000000","123481",4.75,"1","1", function(accountInfo) {
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
})*/
/*
//员工查询所有贷款情况
router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to list loan."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.listAllLoan( function(accountInfo,list) {
                callback(null, accountInfo,list);
            });
        }], function (err, accountInfo,list) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            if(list.length>0){
                resultInfo.status = accountInfo.match;
                resultInfo.message = "list loan info successfully."
                console.log(list)
            }

        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
})*/

//yh查询所有贷款情况
/*router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to list loan."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.listOneUserLoan("1", function(accountInfo,list) {
                callback(null, accountInfo,list);
            });
        }], function (err, accountInfo,list) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            if(accountInfo.match) {
                resultInfo.message = "list loan info successfully."
                resultInfo.status = true
                if(list.length>0){
                    console.log(list)
                }
            }
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
})*/

//审批
/*router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to check loan."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.checkloan("10","2", function(accountInfo,list) {
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
})*/

//还贷款
/*router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var resultInfo = {
        status: false,
        message: "Fail to payment."
    };
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            ManageAccount.paymentLoan("11", function(accountInfo,list) {
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
})*/

//返回利率
/*

router.post('/deposit/commitDeposit',function(req,res,next){
    console.log(req.body);


    //var applicant = req.body;
    var applicant = {
        num:6
    }
    var resultInfo = {
        status: false,
        loanRate: -1
    };
    if(applicant.num==3){
        applicant.num=0
    }else if(applicant.num==6){
        applicant.num=1;
    }else{
        applicant.num=2;
    }
    async.waterfall([
        function (callback) {//一个callback对应再往下的一个callback
            resultInfo.loanRate = LOANRATE[applicant.num]
            callback(null)
        }], function (err) {//和前1行的accountInfo对应
        if (err) {
            console.error("Error transfer at sql return.")
            console.error("Reveived Info from interface: ",applicant)
        }
        else {
            if(resultInfo.loanRate != -1) {
                resultInfo.status = true
                console.log("Loan rate is ",resultInfo.loanRate)
            }
        }
        res.status(resultInfo.status?200:500).json(resultInfo);
    });
})
*/



module.exports = router;
