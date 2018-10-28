export class LoginSql {
    constructor(){

    }

    static getUser(userID,type){

        return 'SELECT * FROM user WHERE userID = \''+userID+'\'';

    }
}
