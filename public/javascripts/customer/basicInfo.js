//get balance num
function getBalance(index) {

    // getAuthorization("token",function (status,msg) {
    //
    // });

    var accountNo = $('#accountNo'+index).val();
    accountNo = "123456";
    if(true){
        $.ajax({
            url: '/customer/basicInfo/getBalance',
            type: 'post',
            data:{
                accountNo:accountNo
            },
            dataType: 'json',
            success: function (data) {

                $('#balance'+index).val(data.balance);
            },
            error : function (data) {

            }
        });
    }
}

function getInfo(index) {
    getAuthorization("token",function (status,msg) {
        var accountNo = $('#accountNo'+index).val();
        if(status){
            $.ajax({
                url: '/customer/basicInfo/getInfo',
                type: 'get',
                data:{
                    accountNo:accountNo
                },
                dataType: 'json',
                success: function (data) {

                },
                error : function (data) {

                }
            });
        }else {
            alert(msg);
        }
    });
}
