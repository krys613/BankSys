// todo fix bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!may cause by bootstrap modal,fix or rewrite a modal
// onetime and token
function getAuthorization(type,callback) {
    if(type === "onetime"){
        getOneTimeAuthorization(function (status,msg) {
            callback(status,msg);
        })

    }else if(type === "token"){
        checkToken(function (status,msg) {
           if(status){
               callback(true,"token exist");
           }else {
               if(msg == "SessionExpire"){
                   alert(msg);
               }else {
                   getTimeLimitAuthorization(function (status,msg) {
                       callback(status,msg);
                   });
               }
           }
        });
    }else {
        callback(false,"wrong function");
    }
}

var check6pwModal = $('#check6pwModal');
var hiddenInput = $('#hiddenInput');
var check6pwBlocks = document.getElementById('blocks');
var check6pwResult = $('#checkResult');


function checkToken(callback) {
    $.ajax({
        url: '/authorization/checkToken',
        type: 'get',
        dataType: 'json',
        success: function (msg) {
            if(msg.success){
                callback(msg.success,"成功");
            }else {
                callback(msg.success,msg.err);
            }
        },
        error : function (msg) {
            callback(false,"发生错误");
        }
    });
}


function getOneTimeAuthorization(callback) {
    check6pw("onetime",function (status,msg) {
        callback(status,msg);
    });
}

function getTimeLimitAuthorization(callback) {
    check6pw("token",function (status,msg) {
        callback(status,msg);
    });
}

//post to check 6pw
function check6pw(type,callback) {
    //listen hidden input
    //todo check num icheck?
    console.log(check6pwModal);
    check6pwModal.modal('show');

    hiddenInput.on('input',function (e) {
        //change blocks num by length
        var val = hiddenInput.val();
        var length = val.length;


        var blocksNum = check6pwBlocks.childElementCount;
        var block = document.createElement("div");
        block.classList.add("block");

        if(length>blocksNum){
            //add a block
            check6pwBlocks.appendChild(block);
            if(length == 6 ){
                //sent request
                check6pwReq(val,type,function (status,msg) {
                   callback(status,msg);
                });
            }
        }else{
            //remove a block
            check6pwBlocks.removeChild(check6pwBlocks.lastChild);
        }
    });
}

function check6pwReq(pw,type,callback) {
    $.ajax({
        url: '/authorization/getAuthorization',
        type: 'post',
        data :{
            password:pw,
            type:type
        },
        dataType: 'json',
        success: function (msg) {
            check6pwResult.html(msg.success?'success':"fail");
            setTimeout(function () {
                callback(msg.success,msg.err);
                check6pwModal.modal('hide');
            },500);
        },
        error :function (msg) {
            callback(false,"发生错误");
        }
    });
}

//input get focus wherever user click
function fixFocus() {
    hiddenInput.focus();
}

check6pwModal.on('shown.bs.modal', function () {
    fixFocus();
});

//clear thins when modal hidden
check6pwModal.on('hidden.bs.modal', function () {
    hiddenInput.val("");
    hiddenInput.blur();
    check6pwBlocks.innerHTML="";
    check6pwResult.html('');
});
