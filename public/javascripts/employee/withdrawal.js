function commitWithdrawal() {

    getAuthorization("token",function (status,msg) {
        var accountNo = $('#customerAccount').val();
        var withdrawalAccount = $('#withdrawalAccount').val();
        if(true){
            $.ajax({
                url: '/employee/withdrawal/commitWithdrawal',//todo
                type: 'post',
                data:{
                    accountNo:accountNo,
                    Amount:withdrawalAccount
                },
                dataType: 'json',
                success: function (data) {

                    alert("取款成功");
                },
                error : function (err) {
                    alert(err.message);
                }
            });
        }
    });
}
