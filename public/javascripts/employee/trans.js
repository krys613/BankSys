function commitTrans() {

    getAuthorization("token",function (status,msg) {
        var fromNo = $('#fromAccount').val();
        var toNo = $('#toAccount').val();
        var amount = $('#transAmount').val();
        var fromName = $('#fromName').val();
        var toName = $('#toName').val();
        if(status){
            $.ajax({
                url: '/employee/trans/commitTrans',
                type: 'post',
                data:{
                    AccountNoFrom:fromNo,
                    AccountNoTo:toNo,
                    nameFrom:fromName,
                    nameTo:toName,
                    Amount:amount
                },
                dataType: 'json',
                success: function (data) {

                    alert("转账成功");
                },
                error : function (data) {
                    alert("转账失败");
                }
            });
        }
    });
}
