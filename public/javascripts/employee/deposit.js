function commitDeposit() {
    var AccountNo = $('#customerAccount').val();
    var Amount = $('#depositAccount').val();
    if(true){
        getAuthorization('onetime',function (status,msg) {
            if(status){
                $.ajax({
                    url: '/employee/deposit/commitDeposit',//todo
                    type: 'post',
                    data:{
                        AccountNo:AccountNo,
                        Amount:Amount
                    },
                    dataType: 'json',
                    success: function (data) {

                        alert("存款成功");
                    },
                    error : function (data) {
                        alert("存款失败");
                    }
                });
            }
        });
    }
    /*getAuthorization("token",function (status,msg) {//TODO 没有调用验证

    });*/
}
