import express from 'express';
var router = express.Router();
import {CheckPW} from "../../server/privacy/checkPW";
import async from 'async';

router.get('/', function(req, res, next) {

    res.render('user/login');
});

router.post('/confirmLogin',function (req,res,next) {
    var user = req.body;

    var json = {
        user:{
            type:user.type
        },
        status: true,
        msj:'wrong'
    };

    async.waterfall([
        function(callback){
            CheckPW.checkLogin(user.userID,user.type,user.password,function (match,user) {
                callback(null,match,user);
            });
        }
    ],function (err,match,user) {
        json.status = match;
        if(match) {
            req.session.user = user;
        }
        res.json(json);
    });
});

router.post('/btn1',function (req,res,next) {
    var json = {
        attribute:"123"
    };
   res.json(json).end();
});




module.exports = router;
