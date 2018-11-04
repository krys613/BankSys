var father;
var scenes;
var maxLength;
var processArray = new Array();
var trustArray = new Array();
var resultArray = new Array();

function waterFall(fatherID, waterFallData) {
    father = $("#" + fatherID);
    // maxLength
    maxLength = waterFallData.length;
    scenes = factory(waterFallData);
    linkScenes(scenes);
    generateProcessBar();
}

//factory method
function factory(waterFallData) {
    var scenes = new Array();
    for (var i in waterFallData) {
        scenes[i] = new Scene(i, waterFallData[i]);
    }

    return scenes;
}

//todo for test delete when apply
//manage to show or hide
function linkScenes(scenes) {
    for (var i in scenes) {
        scenes[i].hide();
    }
    scenes[0].show();
}

//back
function backScene(index) {
    var backIndex = index - 1;
    if (backIndex < 0) {
        //todo refresh
        alert("no back")
    } else {
        scenes[index].hide();
        scenes[backIndex].show();
    }
    if (scenes[backIndex].haveNoButton()) {
        backScene(backIndex);
    }
}

//next
async function nextScene(index) {
    var type = scenes[index].authorization;
    if (type !== "") {
        var result = await getAuthor(type);
        if (result.success) {
            jumpToNextScene(index);
        } else {
        }
    } else {
        jumpToNextScene(index);
    }

}

async function jumpToNextScene(index) {
    var nextIndex = index + 1;
    if (nextIndex === maxLength) {
        //todo show complete
        alert("no next");
    } else {
        scenes[index].hide();
        scenes[nextIndex].fadeIn();
    }
    if (scenes[nextIndex].haveNoButton()) {
        if (trustArray[(nextIndex + 1) / 2] !== 1) {
            var processIndex = (nextIndex - 1) / 2;
            processArray[processIndex].pending();
            if (scenes[nextIndex].reqName !== "") {

                var result = await sendRequest(nextIndex);
                resArray.publish(processIndex, result);
                resultArray.push(result);
                if (result.status) {

                    waitMiddle(2000).then(function () {
                        processArray[processIndex].success();
                        nextScene(nextIndex, nextIndex + 1);
                    });


                } else {
                    waitMiddle(2000).then(function () {
                        processArray[processIndex].error();
                        waitMiddle(500).then(function () {
                            backScene(nextIndex);
                            processArray[processIndex].clear();
                        });

                    });
                }
            } else {
                processArray[processIndex].success();
                waitMiddle().then(function () {
                    nextScene(nextIndex, nextIndex + 1);
                });
            }
        } else {
            nextScene(nextIndex, nextIndex + 1);
        }
    } else {
        trustArray[nextIndex / 2] = 1;
    }
}

function sendRequest(nextIndex) {
    return new Promise((resolve, reject) => {
        scenes[nextIndex].sendReq(function (data) {
            resolve(data);
        });
    });
}


async function getRes(index) {
    return new Promise((resolve, reject) => {
        if (resultArray[index] != null) {
            resolve(index);
        }
    });
}


var resArray = {};
resArray.orderList = {};
resArray.listen = function (id, info) {
    if (!this.orderList[id]) {
        this.orderList[id] = [];
    }
    this.orderList[id][0] = info;
};
resArray.publish = function (index, result) {
    var infos = this.orderList[index];
    if (!infos || infos.length === 0) {
        return false;
    }
    var arg = [];
    arg.push(result);
    infos[0].apply(this, arg);
};

function addListen(index, resListener) {
    resArray.listen(index, resListener);
}


function waitMiddle(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('1');
        }, time)
    });
}

class Scene {

    constructor(i, water) {
        this.index = parseInt(i);
        this.container = this.getItems(water.container);
        this.back = this.getItems(water.back);
        this.next = this.getItems(water.next);
        this.authorization = water.authorization;
        this.name = water.name;
        this.link(this.index);

        //request
        this.alertBtn = this.getItems(water.alertBtn);
        this.getAlertBtn(this.index);
        this.reqName = water.requestName;
        this.reqData = water.send;
    }

    getAlertBtn(index) {
        if (this.alertBtn != null) {
            this.alertBtn.click(function () {
                //destroy progress
                for (var i = 0; i < processArray.length; i++) {
                    if (i >= index / 2) processArray[i].clear();
                }
                //change trustArray;
                for (var i = 0; i < trustArray.length; i++) {
                    if (i >= index / 2) trustArray[i] = 0;
                }
            });
        }
    }

    sendReq(callback) {
        $.ajax({
            type: 'post',
            url: '/test/' + this.reqName,
            data: this.generateReqData(),
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function () {

            }
        });
    }

    generateReqData() {
        var json = {};
        for (var i = 0; i < this.reqData.length; i++) {
            var item = $('#' + this.reqData[i]);
            var tryGet = item.val();
            if (tryGet !== "") {
                json[this.reqData[i]] = tryGet;
            } else {
                json[this.reqData[i]] = item.text();
            }
        }
        return json;
    }


    getItems(id) {
        if (id !== "") {
            return $("#" + id);
        }
        return null;
    }

    link(index) {
        if (this.back != null) {
            this.back.click(function () {
                backScene(index);
            });
        }
        if (this.next != null) {
            this.next.click(function () {
                nextScene(index);
            });
        }
    }

    haveNoButton() {
        return (this.back == null && this.next == null);
    }

    show() {
        this.container.show();
    }

    hide() {
        this.container.hide();
    }

    fadeIn() {
        this.container.fadeIn();
    }


    fadeOut() {
        this.container.fadeOut();
    }
}

function getAuthor(type) {
    return new Promise(function (resolve, reject) {
        getAuthorization(type, function (success, msg) {
            var result = {
                success: success,
                msg: msg
            };
            resolve(result);
        })
    });
}

function generateProcessBar() {

    var barContainer = document.createElement('div');
    barContainer.style.width = "100%";
    barContainer.style.height = "50px";

    var firstName = document.createElement('div');
    firstName.style.cssFloat = 'left';
    firstName.innerHTML = scenes[0].name;
    barContainer.appendChild(firstName);

    trustArray.push(0);

    for (var i = 1; i < scenes.length; i++) {

        if (scenes[i].name !== "") {
            trustArray.push(0);
            var stageName = document.createElement('div');
            stageName.style.cssFloat = 'left';
            stageName.innerHTML = scenes[i].name;

            var progressDiv = document.createElement('div');
            progressDiv.style.width = '200px';
            progressDiv.style.cssFloat = 'left';

            var progress = new myProgress(i);

            processArray.push(progress);
            progressDiv.innerHTML = progress.htmlStr;

            barContainer.appendChild(progressDiv);
            barContainer.appendChild(stageName);

        }
    }

    father.prepend(barContainer);
}

class myProgress {
    constructor(ID) {
        this.proID = 'progress' + ID;
        this.htmlStr = "        <div class=\"progress\">\n" +
            "            <div class=\"progress-bar progress-bar-striped\" id =\"progress" +
            ID +
            "\" role=\"progressbar\" style=\"width: 0%\" aria-valu" +
            "enow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n" +
            "\n" +
            "        </div>";
    }

    getHtml() {
        return this.htmlStr;
    }

    getEle() {
        return $('#' + this.proID);
    }

    pending() {
        this.getEle().addClass('progress-bar-animated');
        this.getEle().animate({width: '100%'}, 1500);
    }

    success() {
        this.getEle().removeClass('progress-bar-animated');
        this.getEle().removeClass('progress-bar-striped');
        this.getEle().addClass('bg-success');
    }

    error() {
        this.getEle().removeClass('progress-bar-animated');
        this.getEle().removeClass('progress-bar-striped');
        this.getEle().addClass('bg-danger');
    }

    clear() {
        this.getEle().addClass('progress-bar-striped');
        this.getEle().removeClass('bg-danger');
        this.getEle().removeClass('bg-success');
        this.getEle().width("0%");
    }
}
