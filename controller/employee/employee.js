import express from 'express';
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


module.exports = router;
