import express from 'express';
import async from "async";
import {CustomerQuery} from "../../server/data/customer";
import {ObjToJson} from "../../server/tools/objToJson";
var router = express.Router();

//page

router.get('/', function(req, res, next) {
    // if (req.session.user.name != null && req.session.user.type === "customer"){
    //     //todo tougher check
    //     return  res.render('customer/customer',{
    //         name:req.session.user.name
    //     });
    // }else {
    //     return  res.send("no user");
    // }
    //todo for test, replace this code when release!!
    var testUser = {
        userID:"1",
        name:"测试客户",
        type:"employee"
    };
    req.session.user = testUser;
    return  res.render('customer/customer',{
        name:req.session.user.name
    });
});

router.get('/basicInfo',function (req,res,next) {

    //res.sendFile(appRoot+'/views/customer/basicInfo.html');
    async.waterfall([
        function (callback) {
            CustomerQuery.getAllAccountInfo(req.session.user.userID,function (err,accounts) {
                callback(null,accounts);
            })
        }
    ],function (err,accounts) {
        var json = new ObjToJson(accounts).toJson();
        res.render('customer/basicInfo',{
            accounts:json.data});
    });
});

router.get('/home',function (req,res,next) {
    res.sendFile(appRoot+'/views/customer/home.html');
});

router.get('/trans',function (req,res,next) {
    res.sendFile(appRoot+'/views/customer/trans.html');
});

router.get('/loan',function (req,res,next) {
    res.sendFile(appRoot+'/views/customer/loan.html');
});


router.get('/ggg',function (req,res,next) {
    var test ={
        test:"hahahahhaha"
    };
    res.json(test);
});


module.exports = router;
