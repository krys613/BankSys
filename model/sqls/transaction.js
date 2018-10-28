class TransactionSql {
    constructor(){

    }
	//这条sql语句只更新transaction_save表，账户余额变更请调用account.js
	static deposit(AccountNo,date,Amount,Description){
		return "INSERT INTO transaction_save(AccountNo,Date,Amount,Description) "+
		"VALUES ("+AccountNo+", '"+date+"', "+Amount+", '"+Description+"')";
	}
	//这条sql语句只更新transaction_transfer表，账户余额变更请调用account.js
	static transfer(AccountNoFrom,AccountNoTo,date,Amount,Description){
		return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount,Description) "+
		"VALUES ("+AccountNoFrom+", "+AccountNoTo+", '"+date+"', "+Amount+", '"+Description+"')";
	}
	//这条sql语句只更新transaction_withdraw表，账户余额变更请调用account.js
	static withdraw(AccountNo,date,Amount,Description){
		return "INSERT INTO transaction_withdraw(AccountNo,Date,Amount,Description) "+
		"VALUES ("+AccountNo+", '"+date+"', "+Amount+", '"+Description+"')";
	}
	
}
/*
test
console.log(TransactionSql.deposit(2,"2018/10/26",100,"test"));
console.log(TransactionSql.transfer(3,2,"2018/10/26",100,"test"));
console.log(TransactionSql.withdraw(2,"2018/10/26",100,"test"));
*
