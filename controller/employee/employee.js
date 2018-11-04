import express from 'express';
import async from "async";
import {ObjToJson} from "../../server/tools/objToJson";
import TokenManager from '../../server/privacy/tokenManager';
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

router.post('/applyForAccount',function (req,res,next) {
    console.log(req.body);
    var json={
        status:true
    };
    res.json(json);
});

module.exports = router;
