/*转账事务处理请调用tansfer*/
export class transferAffairSql{
	constructor(){

    }
	static tran(AccountNoFrom,AccountNoTo,date,Amount,Description){
		return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount,Description) "+
		"VALUES ("+AccountNoFrom+", "+AccountNoTo+", '"+date+"', "+Amount+", '"+Description+"')";
	}
	static updateAccountAmount(AccountNo,money){
		return "UPDATE account SET Amount=Amount+("+money+") where AccountNo="+AccountNo;
	}
	static transfer(AccountNoFrom,AccountNoTo,date,Amount,Description){
		return "begin; "+transferAffairSql.tran(AccountNoFrom,AccountNoTo,date,Amount,Description)+"; "+
		transferAffairSql.updateAccountAmount(AccountNoFrom,-1*Amount)+"; "+
		transferAffairSql.updateAccountAmount(AccountNoTo,Amount)+"; "+"commit;"
	}
}
