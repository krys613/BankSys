import crypto from 'crypto';

function getKey(userID) {
    return "todo";
}
//todo replace sha1 to hmac md5
function getHash(key,pw) {
    var sha1 = crypto.createHash("sha1");
    sha1.update(pw);
    return sha1.digest("hex");
}

export class Encrypt {
    constructor(){

    }
    static getHashString(userID,pw){
        return getHash(getKey(userID),pw);
    }

}
