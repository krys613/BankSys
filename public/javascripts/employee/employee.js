//bootstrap nav
$('#leftNav a').on('click', function (e) {
    $(this).tab('show');
});

//show content
function show(url) {
    $.ajax({
        url: '/employee'+url,
        type: 'get',
        dataType: 'html',
        success: function (data) {
            $('#content').html(data);
        },
        error : function (data) {
            alert('身份已经过期');
            //todo redirect
        }
    });
}

//show createAccount modal
$('#createAccount').click(function(){
    $('#caModal').modal('show');
        //自动填充操作人、当前时间
    var loginName='测试员工';   //todo 获取当前登陆员工姓名
    $('#caModal').find('input[name="creator"]').val(loginName);
    var tempTime=today();
    $('#caModal').find('input[name="creatTime"]').val(tempTime);

});

// post applyForAccount data
$('#applyForAccount').click(function(){

    var customerName = $('#caModal').find('input[name="customerName"]').val();
    var customerID = $('#caModal').find('input[name="customerID"]').val();
    var passWord = $('#caModal').find('input[name="Password"]').val();
    $.ajax({
        type:'POST',
        url:'/employee/applyForAccount',
        data:{
            'name':customerName,
            'custID':customerID,
            'PassWord':passWord
        },
        dataType:'JSON',
        async:false,
        success:function(res){
            alert(res.message);
        },
        error:function (err) {
            alert(err.message);
        }
    });
    $('#caModal').modal('hide');
});

//get current date
function today(){
        var today=new Date(),
        h=today.getFullYear(),
        m=today.getMonth()+1,
        d=today.getDate();
        return h+"-"+m+"-"+d;
}

$('#log-out').click(function(){
    window.location.href = "localhost:3000/login";//todo 重定向
});

function examine() {
    window.location.href = "/examine";
}
function myRedirect(type,url,data) {
    $.ajax({
        url: '/'+type+'/'+url,
        type: 'get',
        data: data,
        dataType: 'html',
        success: function (data) {
            $('#content').html(data);
            $('#'+type+url).tab('show');
        },
        error : function (data) {
            alert('身份已经过期');
        }
    });
}
