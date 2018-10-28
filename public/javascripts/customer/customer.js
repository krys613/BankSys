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

function checkToken() {
    $.ajax({
        url: '/customer/checkToken',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            //todo shown data
            return true;
        },
        error : function (data) {
            alert('身份已经过期');
            //todo redirect
            return false;
        }
    });
}
