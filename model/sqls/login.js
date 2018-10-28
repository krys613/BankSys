export class LoginSql {
    constructor(){

    }

    static isUserExist(username){

        return 'SELECT 1 FROM reglogin WHERE UserID = \''+username+'\'LIMIT 1';

    }
	static isPwd
}
