//get balance num
function getBalance(accountNo) {

    getAuthorization("token",function (status,msg) {
        if(true){
            $.ajax({
                url: '/customer/basicInfo/getBalance',
                type: 'post',
                data:{
                    accountNo:accountNo
                },
                dataType: 'json',
                success: function (data) {
                    $('#balance'+accountNo).text(data.balance);
                },
                error : function (data) {

                }
            });
        }
    });
}

// function getInfo(index) {
//     getAuthorization("token",function (status,msg) {
//         var accountNo = $('#accountNo'+index).val();
//         if(status){
//             $.ajax({
//                 url: '/customer/basicInfo/getInfo',
//                 type: 'get',
//                 data:{
//                     accountNo:accountNo
//                 },
//                 dataType: 'json',
//                 success: function (data) {
//                     $('#balance'+index).text(data.balance)
//                 },
//                 error : function (data) {
//
//                 }
//             });
//         }else {
//             alert(msg);
//         }
//     });
// }

function trans(index) {
    myRedirect('customer','trans',{accountNo:index});
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
