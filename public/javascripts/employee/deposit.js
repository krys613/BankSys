function commitDeposit() {

    getAuthorization("token",function (status,msg) {
        var accountNo = $('#customerAccount').val();
        var depositAccount = $('#depositAccount').val();
        if(true){
            $.ajax({
                url: '/employee/deposit/commitDeposit',
                type: 'post',
                data:{
                    accountNo:accountNo,
                    depositAccount:depositAccount
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
