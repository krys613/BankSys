// container:"test1div",
//     back:"test1back",
//     next:"test1next",
//     request:"get",
//     authorization:"",
//     await:""

//father container,include all scene
var father;
var scenes;
var maxLength;
function waterFall(father,waterFallData) {
    father = $("#"+father);
    // maxLength
    maxLength = waterFallData.length;
    scenes = factory(waterFallData);
    linkScenes(scenes);
}

//factory method
function factory(waterFallData) {
    var scenes = new Array();
    for(var i in waterFallData){
        scenes[i] = new Scene(i,waterFallData[i]);
    }

    return scenes;
}

//manage to show or hide
function linkScenes(scenes) {
    for (var i in scenes){
        scenes[i].hide();
    }
    scenes[0].show();
}

//back
function backScene(index) {
    var backIndex = index - 1;
    if(backIndex < 0){
        //todo refresh
        alert("no back")
    }else {
        scenes[index].hide();
        scenes[backIndex].show();
    }
    if(scenes[backIndex].haveNoButton()){
        backScene(backIndex);
    }
}

//next
async function nextScene(index) {
    var type = scenes[index].authorization;
    console.log(type);
    if( type!== ""){
        var result = await getAuthor(type);
        if(result.success){
            jumpToNextScene(index);
        }else {
            alert(result.msg);
        }
    }else {
        jumpToNextScene(index);
    }

}

function jumpToNextScene(index) {
    var nextIndex = index + 1;
    if(nextIndex === maxLength){
        //todo show complete
        alert("no next");
    }else {
        scenes[index].hide();
        scenes[nextIndex].fadeIn();
    }
    if(scenes[nextIndex].haveNoButton()){
        var p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("222");
                    resolve("show");
                }, 2000);
            })
        ;
        p.then(function () {
            nextScene(nextIndex,nextIndex+1)
        });
    }
}

class Scene {

    constructor(i,water){
        this.index = parseInt(i);
        this.container = this.getItems(water.container);
        this.back = this.getItems(water.back);
        this.next = this.getItems(water.next);
        this.authorization = water.authorization;
        this.link(this.index);
    }

    getItems(id){
        if(id !== ""){
            return $("#"+id);
        }
        return null;
    }

    link(index){
        if(this.back != null){
            this.back.click(function () {
                backScene(index);
            });
        }
        if(this.next != null){
            this.next.click(function () {
                nextScene(index);
            });
        }
    }

    haveNoButton(){
        return this.back==null;
    }

    show(){
        this.container.show();
    }

    hide(){
        this.container.hide();
    }

    fadeIn(){
        this.container.fadeIn();
    }


    fadeOut(){
        this.container.fadeOut();
    }
}


function getFirstName() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let json = {
                he:"123",
                she:"23"
            };
            resolve(json);
        }, 500);
    });
}

function getLastName() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('world');
        }, 3000);
    });
}

async function say() {
    var firstName = await getFirstName();
    console.log(firstName);
    var secondName = await getLastName();
    console.log(secondName);

}


function getAuthor(type) {
    return new Promise(function (resolve,reject) {
        getAuthorization(type,function (success,msg) {
            var result = {
                success:success,
                msg:msg
            };
            resolve(result);
        })
    });
}
