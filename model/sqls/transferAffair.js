/*转账事务处理请调用tansfer*/
export class transferAffairSql{
    constructor(){

    }
    static tran(AccountNoFrom,AccountNoTo,date,Amount){
        return "INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount) "+
            "VALUES (" + AccountNoFrom + ", " + AccountNoTo + ", '" + date + "', " + Amount + ");";
    }
    static updateAccountAmount(AccountNo,Amount){
        return "UPDATE account SET Amount=Amount+(" + Amount + ") where AccountNo=" + AccountNo+";";
    }
    static transfer(AccountNoFrom,AccountNoTo,date,Amount){
        return "begin "+
            transferAffairSql.updateAccountAmount(AccountNoFrom,-1*Amount)+
            transferAffairSql.updateAccountAmount(AccountNoTo,Amount)+
            transferAffairSql.tran(AccountNoFrom,AccountNoTo,date,Amount)+"commit;en;"
    }
}