//bootstrap nav
$('#leftNav a').on('click', function (e) {
    $(this).tab('show');
});

//show content
function show(url) {
    $.ajax({
        url: '/employee'+url,
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