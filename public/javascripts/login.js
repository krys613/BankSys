var LOGININGEMPLOYEE = null;

$(document).ready(function() {
    $("#login").click(function(){
        $("#login").val("登录中...").attr("disabled","true");
		doLogin();
	});
    $(document).keyup(function(event){
        if(event.keyCode ==13){
        	var text=$("#login").val();
        	if(text=="登录"){
                $("#login").val("登录中...").attr("disabled","true");
                doLogin();
			}
        }
    });

// 测试向后台请求数据
    $("#testdata").click(function(){
        $.ajax({
            type:'post',
            url:'/login/btn1',
            data : {
            },
            dataType:'json',
            success:function(data){
                console.log("success");
                    $("#testbox").val(data['attribute']);
            },
            error:function(){
                $("#testbox").val("fail");
            }
        });
    });
});

function doLogin(){
	if(!checkAccountIntput($("#loginCellPhone")) || !checkPasswordInput($("#loginPassword"))|| !$.string.isNullOrEmpty($(".alert_span").text())){
        $("#login").val("登录").removeAttr("disabled");
        return false;
	}else{
        $.ajax({
            type : "POST",

            url : "/login/confirmLogin",

            data : {
                userID :  $("#loginCellPhone").val(), //向后台传输用户名、密码、角色是客户/员工
                password :  $("#loginPassword").val() ,
                type :  $("#loginRole").val()=== '1'?"customer":"employee",
            },
            dataType : "json",

            success : function(returnMsg) {//需要返回returnMsg（user：当前登陆用户 status：登陆状态 msj：登陆成功/账号或密码错误 menuJSON：对不同角色生成菜单 ）
                if(returnMsg.status ){
                    loginSuccess(returnMsg);
                }else{
                    loginFailure(returnMsg);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus+errorThrown);
                $("#login").val("登录").removeAttr("disabled");
                return false;
            }
        });
	}
}

function checkAccountIntput(input) {

	$(".alert_span").remove();

	$(".alert_span").remove();

	if ($(input).val() == "" ) {
		$(input)
				.parent()
				.after(
						"<span class='alert_span'><font color='red'>帐号不能为空！</font></span>");
		$(input).focus();
		return false;
	}

	return true;
}

function checkPasswordInput(input) {

    $(".alert_span").remove();

    if ($(input).val() == "" || $(input).val().length < 6) {
        $(input)
            .parent()
            .after(
                "<span class='alert_span'><font color='red'>请输入6位及上密码！</font></span>");
        $(input).focus();
        return false;
    }
    return true;

}

function loginSuccess(returnMsg){
    $("#login").val("登录").removeAttr("disabled");

	if("customer" === returnMsg.user.type){
		localStorage.menu = JSON.stringify(returnMsg.menuJSON);

		delete returnMsg.menuJSON ;

        $.cookie('loginingGuest',JSON.stringify(returnMsg));
        var loginCookie=JSON.parse($.cookie("loginingGuest"));
		console.log("cookie:"+JSON.stringify(loginCookie));
		window.location.href = "/customer";//登陆成功进入客户主页面
		return ;
	}
	if("employee" === returnMsg.user.type){
		localStorage.menu = JSON.stringify(returnMsg.menuJSON);

		delete returnMsg.menuJSON ;

        $.cookie('loginingEmployee',JSON.stringify(returnMsg));
        var loginCookie=JSON.parse($.cookie("loginingEmployee"));
		console.log("cookie:"+JSON.stringify(loginCookie));
		window.location.href = "/employee";//登陆成功进入员工主页面
		return ;
	}
}

function loginFailure(returnMsg){
    $("#login").val("登录").removeAttr("disabled");
    $("#failureMsg").empty();
	$("#failureMsg").append("&nbsp;&nbsp;<span class='alert_span'><font color='red'>"+returnMsg.msg+"</font></span>");
}

