function commitDeposit() {

    getAuthorization("token",function (status,msg) {
        var AccountNo = $('#customerAccount').val();
        var Amount = $('#depositAccount').val();
        if(true){
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
