export class bankdraftSql{
	constructor(){
		
	}
	/*申请汇票 插入bankdraft表各字段*/
	static applyDraft(AccountNoFrom,FromName,AccountNoTo,ToName,date,Deadline,Amount,Description){
		return "INSERT INTO bankdraft (AccountNoFrom,FromName,AccountNoTo,ToName,date,Deadline,Amount,Description) VALUES ("+
		AccountNoFrom+", '"+FromName+"', "+AccountNoTo+", '"+ToName+"', '"+date+"', '"+Deadline+"', "+Amount+", '"+Description+
		"');";
	}
	/*审核汇票页面*/
	static checkDraft(){
		return "SELECT * FROM bankdraft WHERE Status = '0';";
	}
	/*按Status的值分类展示汇票单*/
	static showDraft(Status){
		return "SELECT * FROM bankdraft WHERE Status='"+Status+"';";
	}
}
