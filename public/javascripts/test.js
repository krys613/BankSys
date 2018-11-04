
var fall = [
    {
        name:"填写账号",
        container:"test1div",
        back:"",
        next:"test1next",
        authorization:"",
        requestName:"",
        requestMethod:"",
        alertBtn:"test1alert",
        send:[]
    },
    {
        name:"",
        container:"test2div",
        back:"",
        next:"",
        authorization:"",
        requestName:"testwaterfall",
        requestMethod:"post",
        alertBtn:"",
        send:["test1data1","test1data2"]
    },
    {
        name:"填写流程",
        container:"test3div",
        back:"test3back",
        next:"test3next",
        authorization:"",
        requestName:"",
        requestMethod:"",
        alertBtn:"test3alert",
        send:[]
    }
];

waterFall("testbody",fall);




var resListener = function(result) {
    console.log("123");
};
addListen(0,resListener);





var resListener1 = function (result) {
    console.log(result);
};
addListen(1,resListener1);
