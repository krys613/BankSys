import express from 'express';
var router = express.Router();

//page

router.get('/', function(req, res, next) {
    res.render('customer/customer');
});

router.get('/basicInfo',function (req,res,next) {
    res.sendFile(appRoot+'/views/testejs.html');
});


router.get('/ggg',function (req,res,next) {
    var test ={
        test:"hahahahhaha"
    }
    res.json(test);
});


module.exports = router;
