//get balance num
function getBalance(index) {
    getAuthorization("token",function (status,msg) {
        var accountNo = $('#accountNo'+index).val();
        if(status){
            $.ajax({
                url: '/customer/basicInfo/getBalance',
                type: 'get',
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
        }else {
            alert(msg);
        }
    });
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
