import express from 'express';
var router = express.Router();

//dispatch routers

//index
router.use('/',require('../controller/index'));

//login
router.use('/login',require('../controller/user/login'));


//customer
router.use('/customer',require('../controller/customer/customer'));
    //basicInfo
    router.use('/customer/basicInfo',require('../controller/customer/basicInfo'));




//employee
router.use('/employee',require('../controller/employee/employee'));


module.exports = router;
