function selectAccount(accountNo) {

    $.ajax({
        url: '/customer/trans/getAccount',
        type: 'get',
        data:{
            accountNo:accountNo
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error : function (data) {

        }
    });

}
