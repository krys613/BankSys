/*这是贷款业务的相关sql语句*/
export class loanSql{
	constructor(){

	}
	static insertLoan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,PunishmentRate,Status,LoanTerm,PassDate,FinishedAmount){
		return "INSERT INTO loan(AccountNo,Name,Job,Company,MonthSalary,Amount,LoanRate,"+
		"PunishmentRate,Status,LoanTerm,PassDate,FinishedAmount) VALUES ("+AccountNo+", '"+Name+"', '"+Job+"', '"+Company+"', "+
		MonthSalary+", "+Amount+", "+LoanRate+", "+PunishmentRate+", '"+Status+"', '"+LoanTerm+"', '"+PassDate+"', "+
		FinishedAmount+");";
	}
	/*用于还款时修改FinshedAmount字段*/
	static updateLoan(LoanID,money){
		return "UPDATE loan SET FinishedAmount=FinishedAmount+"+money+" WHERE LoanID="+LoanID+";";
	}
	/*用于审核贷款申请*/
	static updateStatus(LoanID,Status){
		return "UPDATE loan SET Status='"+Status+"' WHERE LoanID="+LoanID+";";
	}
	static showSingleLoan(LoanID){
		return "SELECT * FROM loan WHERE LoanID="+LoanID+";";
	}
	static showAllLoan(){
		return "SELECT * FROM loan ";
	}
}

/*
console.log(loanSql.insertLoan(2,'jack','loser','ssb',100,1000,0.3,0.5,'0','6','2018/10/28',10));
console.log(loanSql.updateLoan(2,100));
console.log(loanSql.updateStatus(2,1));
*/


