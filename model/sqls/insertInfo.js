/*为user employee customer表插入提供sql语句*/
class insertInfoSql{
	constructor(){

    }
	static insertUser(name,pwd,type){
		return "INSERT INTO user(name,password,type) VALUES ('"+
		name+"' ,'"+pwd+"', '"+type+"')";
	}
	static insertEmployee(employeeID,userID,name,gender,job){
		return "INSERT INTO employee(employeeID,userID,name,gender,job) VALUES ('"+
		employeeID+"' ,"+userID+", '"+name+"', '"+gender+"', '"+job+"')";
	}
	static insertCustomer(custID,userID,name,gender,address,phoneNumber){
		return "INSERT INTO customer(custID,userID,name,gender,address,phoneNumber) VALUES ('"+
		custID+"' ,"+userID+", '"+name+"', '"+gender+"', '"+address+"', '"+phoneNumber+"')";
	}
}
/*
console.log(insertInfoSql.insertUser("mic","huldf","customer"));
console.log(insertInfoSql.insertEmployee(4231343,3,"mic","M","LOSER"));
console.log(insertInfoSql.insertCustomer(423134443,2,"java","M","LA","12344"));
*/
