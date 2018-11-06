export class TransactionSql {
    constructor(){

    }
	//这条sql语句只更新transaction_save表，账户余额变更请调用account.js
	static deposit(AccountNo,date,Amount){
		return "INSERT INTO transaction_save(AccountNo,Date,Amount) "+
		"VALUES ("+AccountNo+", '"+date+"', "+Amount+")";
	}
	//这条sql语句只更新transaction_transfer表，账户余额变更请调用account.js
	static transfer(AccountNoFrom,AccountNoTo,date,Amount){
		return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount) "+
		"VALUES ("+AccountNoFrom+", "+AccountNoTo+", '"+date+"', "+Amount+")";
	}
	//这条sql语句只更新transaction_withdraw表，账户余额变更请调用account.js
	static withdraw(AccountNo,date,Amount){
		return "INSERT INTO transaction_withdraw(AccountNo,Date,Amount) "+
		"VALUES ("+AccountNo+", '"+date+"', "+Amount+")";
	}

}
/*
test
console.log(TransactionSql.deposit(2,"2018/10/26",100,"test"));
console.log(TransactionSql.transfer(3,2,"2018/10/26",100,"test"));
console.log(TransactionSql.withdraw(2,"2018/10/26",100,"test"));
*/
