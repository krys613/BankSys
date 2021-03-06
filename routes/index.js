import express from 'express';
var router = express.Router();

//dispatch routers

//index
router.use('/',require('../controller/user/login'));

//login
router.use('/login',require('../controller/user/login'));

//test
router.use('/test',require('../controller/test'));


//customer
router.use('/customer',require('../controller/customer/customer'));
    //basicInfo
    router.use('/customer/basicInfo',require('../controller/customer/basicInfo'));
    //trans
    router.use('/customer/trans',require('../controller/customer/trans'));

    router.use('/customer/loan',require('../controller/customer/loan'));

//employee
router.use('/employee',require('../controller/employee/employee'));
    //loan
    router.use('/employee/loan',require('../controller/employee/loan'));

router.use('/examine',require('../controller/employee/examine'));

//authorization
router.use('/authorization',require('../controller/user/authorization'));


module.exports = router;
