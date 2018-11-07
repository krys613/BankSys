/*转账事务处理请调用tansfer*/
export class transferAffairSql{
	constructor(){

    }
<<<<<<< HEAD
	static tran(AccountNoFrom,AccountNoTo,date,Amount){
		return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount) "+
		"VALUES ("+AccountNoFrom+", "+AccountNoTo+", '"+date+"', "+Amount+"')";
=======
	static tran(AccountNoFrom,AccountNoTo,date,Amount,Description){
		return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount,Description) "+
		"VALUES ("+AccountNoFrom+", "+AccountNoTo+", '"+date+"', "+Amount+", '"+Description+"')";
>>>>>>> 0986b0772cce8fd5ef8c3d6b4362169a812013d1
	}
	static updateAccountAmount(AccountNo,money){
		return "UPDATE account SET Amount=Amount+("+money+") where AccountNo="+AccountNo;
	}
<<<<<<< HEAD
	static transfer(AccountNoFrom,AccountNoTo,date,Amount){
		return "begin; "+transferAffairSql.tran(AccountNoFrom,AccountNoTo,date,Amount)+"; "+
=======
	static transfer(AccountNoFrom,AccountNoTo,date,Amount,Description){
		return "begin; "+transferAffairSql.tran(AccountNoFrom,AccountNoTo,date,Amount,Description)+"; "+
>>>>>>> 0986b0772cce8fd5ef8c3d6b4362169a812013d1
		transferAffairSql.updateAccountAmount(AccountNoFrom,-1*Amount)+"; "+
		transferAffairSql.updateAccountAmount(AccountNoTo,Amount)+"; "+"commit;"
	}
}
