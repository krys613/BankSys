import express from 'express';
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('test');
});

router.post('/testwaterfall',function (req,res,next) {
   var json = {
       testSuccess:true,
       testError:false,
       testMsg:"this is a msg",
       receiveData:req.body
   };
   if(req.body.test1data2 =="123456"){
       json.testSuccess = false;
   }
   res.json(json);
});

router.post('/testwaterfall1',function (req,res,next) {
    var json = {
        testSuccess:true,
        testError:false,
        testMsg:"this is another msg",
        receiveData:req.body
    };
    res.json(json);
});


module.exports = router;
