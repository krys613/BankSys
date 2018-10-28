/*为各类界面展示提供查询sql语句*/
class querySql {
    constructor(){

    }
	static userInfo(userID){
		return "select * from user where userID="+userID;
	}
	static employeeInfo(employeeID){
		return "select * from employee where employeeID='"+employeeID+"'";
	}
	static customerInfo(custID){
		return "select * from customer where custID='"+custID+"'";
	}
/*
console.log(querySql.userInfo(4));
console.log(querySql.employeeInfo('23435266'));
console.log(querySql.customerInfo("1234"));
*/
