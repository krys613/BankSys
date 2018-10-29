import express from 'express';
import TokenManager from '../../server/privacy/tokenManager';
var router = express.Router();


// get authorization :one time,timeLimit token
// error msg:session expire , password wrong , try over 5 times
router.post('/getAuthorization',function (req,res,next) {
    var json = {
        success:false,
        err:""
    };

    //1.check session
    if(req.session.user == null){
        //session expire
        json.err = "SessionExpire";
        return res.json(json);
    }else {
        var key = req.session.user.userID;
        //2.check wrong times
        TokenManager.getWrongTimes(key,function (times) {
            if(times>=5){
                json.err = "TimesOver";
                return res.json(json);
            }else {
                //3.check password
                //todo update database and finish check pw
                if(req.body.password !== '123456'){
                    TokenManager.addWrongTimes(key,function (times) {
                        json.err = "Wrong";
                        return res.json(json);
                    });
                }else {
                    //4.check if need a token
                    if(req.body.type === "token"){
                        TokenManager.addToken(key);
                    }
                    TokenManager.resetWrongTimes(key);
                    json.success = true;
                    return res.json(json);
                }
            }
        });
    }
});

router.get('/checkToken',function (req,res,next) {
    var json = {
        success:false,
        err:""
    };

    //1.check session
    if(req.session.user == null){
        //session expire
        json.err = "SessionExpire";
        return res.json(json);
    }else {
        //2.check token
        var key = req.session.user.userID;
        TokenManager.isTokenExist(key,function (exist) {
            if(!exist){
                json.err = "NoToken";
                return res.json(json);
            }else {
                json.success = true;
                return res.json(json);
            }
        });
    }
});

module.exports = router;
