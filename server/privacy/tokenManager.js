import redis from 'redis';
import async from 'async';

var client = redis.createClient();
var expire = 120;
var wrongTimeExpire = 86400;
class TokenManager {
    constructor(){

    }

    addToken(key){
        client.set(key,'1','EX',expire);
    }

    isTokenExist(key,callback){
        client.get(key,function (err,reply) {
            callback(reply!=null);
        });
    }

    getWrongTimes(key,callback) {
        client.get(key + "wrong", function (err, reply) {
            callback(reply==null?0:reply);
        });
    }

    addWrongTimes(key,callback){
        async.waterfall([
            function (callbackget) {
                client.get(key+"wrong",function (err,reply) {
                    var times;
                    if(reply == null) times = 1;
                    else {
                        times = 1 + parseInt(reply[0]);
                    }
                    callbackget(null,times);
                })
            }
        ],function (err,times) {
            client.set(key+"wrong",""+times,"EX",wrongTimeExpire);
            callback(times);
        });
    }

    resetWrongTimes(key){
        client.set(key+"wrong","0","EX",2);
    }
}

var manager = new TokenManager();
module.exports = manager;
