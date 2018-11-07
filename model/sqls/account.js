export class AccountSql {
    constructor(){

    }
	static creatAccount(UserID,CreatingDate,Password,Amount,Status){
		return "INSERT INTO account(UserID,CreatingDate,Password,Amount,Status) "+
		"VALUES ('"+UserID+"', '"+CreatingDate+"', '"+Password+"', "+Amount+", "+
		Status+");";
	}
	/*
	in accNoFrom bigint(11),
			in accNoTo bigint(11), in today date, in amou double(11,2)
	 */
	static transfer(accountFrom,accountTo,date,amount){
		return "CALL proc_TransferAction(" + accountFrom +","+accountTo+",'"+date+"',"+amount+ ",@a);";
	}
	//取款时请将money置为负
	static updateAccountAmount(AccountNo,money){
		return "UPDATE account SET Amount=Amount+"+money+" where AccountNo="+AccountNo;
	}
	static isExistedUser(userID){
        return "select name from user where userID="+userID;
    }
	static getBalance(AccountNo){
		return "select Amount,Status from account where AccountNo="+AccountNo;
	}
	static singleAccountInfo(AccountNo,UserID){
		return "select * from account where AccountNo="+AccountNo+" and UserID='"+UserID+"'";
	}
	static getAllAccountInfo(UserID){
		return "select * from account where UserID= "+UserID;
	}
	/*以下查询存取款记录*/
	static depositRecord(AccountNo){
		return "select * from transaction_save where AccountNo="+AccountNo;
	}
	static withdrawRecord(AccountNo){
		return "select * from transaction_withdraw where AccountNo="+AccountNo;
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
