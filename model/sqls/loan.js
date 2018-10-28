/*这是贷款业务的相关sql语句*/
class loanSql{
	constructor(){
		
	}
	static insertLoan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,PunishmentRate,Status,LoanTerm,PassDate,FinishedAmount){
		return "INSERT INTO loan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,"+
		"PunishmentRate,Status,LoanTerm,PassDate,FinishedAmount) VALUES ("+AccountNo+", '"+Name+"' '"+Job+"', '"+Company+"', "+
		MonthSalary+", "+Amount+", "+LoanRate+", "+PunishmentRate+", '"+Status+"', '"+LoanTerm+"', '"+PassDate+
		"', "+FinishedAmount+")";
	}
	static updateLoan(AccountNo,money){
		return "UPDATE loan SET FinishedAmount=FinishedAmount+"+money+"WHERE AccountNo="+AccountNo;
	}
	static updateStatus(AccountNo,Status){
		return "UPDATE loan SET Status="+Status+"WHERE AccountNo="+AccountNo;
	}
}
/*
console.log(loanSql.insertLoan(2,'jack','loser','ssb',100,1000,'6',0.3,0.5,'0','6','2018/10/28',10));
这条语句会忽略最后一个参数 不知道怎么搞的 求大佬修改  
*/