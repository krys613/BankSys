function commitWithdrawal() {

    getAuthorization("token",function (status,msg) {
        var AccountNo = $('#customerAccount').val();
        var Amount = $('#withdrawalAccount').val();
        if(status){
            $.ajax({
                url: '/employee/withdrawal/commitWithdrawal',//todo
                type: 'post',
                data:{
                    AccountNo:AccountNo,
                    Amount:Amount
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
