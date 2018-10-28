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
        }
    });
}
