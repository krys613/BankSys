//bootstrap nav
$('#leftNav a').on('click', function (e) {
    $(this).tab('show');
});



//show content
function show(url) {
    $.ajax({
        url: '/customer'+url,
        type: 'get',
        dataType: 'html',
        success: function (data) {
            $('#content').html(data);
        },
        error : function (data) {
            alert('身份已经过期');
            //todo redirect
        }
    });
}


function loginout() {
    $.ajax({
        url: '/customer/loginout',
        type: 'post',
        dataType: 'html',
        success: function (data) {
            window.location.href="http://119.29.111.104";
        },
        error : function (data) {
        }
    });
}
