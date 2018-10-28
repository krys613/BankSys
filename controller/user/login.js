import express from 'express';
var router = express.Router();
import {checkPW} from "../../server/password/checkPW";
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
            var match = checkPW.checkLogin(user.userID,user.type,user.password,function (match) {
                callback(null,match);
            });
        }
    ],function (err,match) {
        json.status = match;
        console.log(json);
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
