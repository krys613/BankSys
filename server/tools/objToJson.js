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

    toJsonWithOut(keys){
    }

}
