export class ObjToJson {
    constructor(obj){
        this.obj = obj;
    }
    //todo only support 1-dimension , todo support n-dimension
    toJson() {
        var json = {};
        var jsonArr = [];
        for(var i in this.obj){
            var subJson = {};
            for (var key in this.obj[i]) {
                subJson[""+key] = this.obj[i][key];
            }
            jsonArr.push(subJson);
        }
        json["data"] = jsonArr;
        return json;
    }

//keys []
    toJsonRenameWith(keys,rename){
        var m = new Map();
        for (var i = 0; i< keys.length;++i){
            m.set(keys[i],rename[i]);
        }
        var json = {};
        var jsonArr = [];
        for(var i in this.obj){
            var subJson = {};
            for (var key in this.obj[i]) {
                if(m.has(key)){
                    var renameKey = m.get(key);
                    subJson[""+renameKey] = this.obj[i][key];
                }
            }
            jsonArr.push(subJson);
        }
        json["data"] = jsonArr;
        return json;
    }

    toJsonWith(keys){
        var m = new Map();
        for (var i = 0; i< keys.length;++i){
            m.set(keys[i],1);
        }
        var json = {};
        var jsonArr = [];
        for(var i in this.obj){
            var subJson = {};
            for (var key in this.obj[i]) {
                if(m.has(key)){
                    subJson[""+key] = this.obj[i][key];
                }
            }
            jsonArr.push(subJson);
        }
        json["data"] = jsonArr;
        return json;
    }

}
