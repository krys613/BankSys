class AccountSql {
    constructor(){

    }
	static creatAccount(CustID,CreatingDate,Password,Amount,Status){
		return "INSERT INTO account(CustID,CreatingDate,Password,Amount,Status) "+ 
		"VALUES ('"+CustID+"', '"+CreatingDate+"', '"+Password+"', "+Amount+", "+
		Status+")";
	}
	//取款时请将money置为负
	static updateAccountAmount(AccountNo,Password,money){
		return "UPDATE account SET Amount=Amount+"+money+" where AccountNo="+AccountNo+
		" and Password='"+Password+"'";
	}
	static getBalance(AccountNo,Password){
		return "select Amount from account where AccountNo="+AccountNo+" and Password='"+Password+"'";
	}
	static singleAccountInfo(AccountNo,CustID){
		return "select * from account where AccountNo="+AccountNo+" and CustID='"+CustID+"'";
	}
	static allAccountInfo(CustID){
		return "select * from account where CustID='"+CustID+"'";
	}
	/*以下查询存取款记录*/
	static depositRecord(AccountNo){
		return "select * from transaction_save where AccountNo="+AccountNo;
	}
	static withdrawRecord(AccountNo){
		return "select * from transaction_withdraw where AccountNo="+AccountNo;
	}
	static transferRecord(AccountNo){
		return "select * from transaction_transfer where AccountNoFrom="+AccountNo;
	}
}
/*
测试语句：
console.log(AccountSql.creatAccount(1234,"1996/11/23","sdfasdf",4566,1));
console.log(AccountSql.updateAccountAmount(2,"sdfasdf",100));
console.log(AccountSql.getBalance(2,"sdfasdf"));
console.log(AccountSql.singleAccountInfo(2,"1234"));
console.log(AccountSql.allAccountInfo("1234"));
*/
