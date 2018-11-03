import express from 'express';
import async from "async";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
import {CheckPW} from "../../server/privacy/checkPW";
import {ManageAccount} from "../../server/privacy/manageAccount";

var router = express.Router();


//page

router.get('/', function(req, res, next) {

    // if(req.session.user.name != null && req.session.user.type === "employee"){
    //     //todo tougher check
    //     res.render('employee/employee',{
    //         name:req.session.user.name
    //     });
    // }else {
    //     res.send("no user");
    // }

    //todo for test, replace this code when release!!!!
    var testUser = {
        userID:"2",
        name:"测试员工",
        type:"employee"
    };
    req.session.user = testUser;
    return  res.render('employee/employee',{
        name:req.session.user.name
    });
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


router.post('/applyForAccount',function(req,res,next){
    console.log(req.body);

    var applicant = req.body;
    var json = {
        status: true,
        message:"123"
    };

    async.waterfall([
        function(callback){//一个callback对应再往下的一个callback
            ManageAccount.CreateAccount(applicant.custID,applicant.PassWord,function (accountInfo) {//userInfo和下一行的accountInfo对应
                callback(null,accountInfo);//userInfo接收CreateAccount函数的返回值
            });
        }
    ],function (err,accountInfo) {//和前1行的accountInfo对应
        json.status = accountInfo.match;
        json.message = accountInfo.accountID

        console.log(accountInfo)
        res.json(json);

    });



});

module.exports = router;

