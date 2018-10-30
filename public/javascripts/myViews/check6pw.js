//add authorization html
$.ajax({
    url: '/authorization/getModal',
    type: 'get',
    success: function (data) {
        $('body').append(data);
    },
    error :function (data) {

    }
});

var check6pwModal ;
var hiddenInput ;
var check6pwBlocks ;
var check6pwResult ;
// todo fix bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!may cause by bootstrap modal,fix or rewrite a modal
// onetime and token
function getAuthorization(type,callback) {

    check6pwModal = $('#check6pwModal');
    hiddenInput = $('#hiddenInput');
    check6pwBlocks = document.getElementById('blocks');
    check6pwResult = $('#checkResult');
    if(type === "onetime"){
        getOneTimeAuthorization(function (status,msg) {
            callback(status,msg);
        })

    }else if(type === "token"){
        checkToken(function (status,msg) {
           if(status){
               callback(true,"token exist");
           }else {
               if(msg === "SessionExpire"){
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

//invisible pw input
function check6pw(type,callback) {
    //listen hidden input
    //todo check num icheck?
    check6pwModal.modal('show');
    console.log("ggg");
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

//request
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
