import express from 'express';
var router = express.Router();

router.get('/ggg',function (req,res,next) {
    var test ={
        test:"hahahahhaha"
    }
    res.json(test);
});


module.exports = router;
