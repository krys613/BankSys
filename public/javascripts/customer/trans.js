function selectAccount(accountNo) {
    $.ajax({
        url: '/customer/trans/getAccount',
        type: 'get',
        data:{
            accountNo:accountNo
        },
        dataType: 'json',
        success: function (data) {
            var acNo = data.accountNo;
            var cardHtml = "<div id=\"accountArea\">\n" +
                "    <div class=\"card bg-light mb-3 accountCard\" style=\"max-width: 18rem;\">\n" +
                "        <div class=\"card-header\" id=\"fromAccountNo\">" +accountNo+"</div>\n" +
                "        <div class=\"card-body\">\n" +
                "            <!--<h5 class=\"card-title\">I类卡</h5>-->\n" +
                "            <div class=\"cardBalanceArea\">\n" +
                "                <div class=\"cardBalance d-flex justify-content-center align-items-center\" id = \"balance"+accountNo+"\" onclick=\"getBalance("+accountNo+")\">\n" +
                "                    余额\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"btn-toolbar justify-content-between cardBtnGroup\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n" +
                "                <p style=\"float: left;width: 60%\">创建日期：123></p>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            $('#accountArea').html(cardHtml);
        },
        error : function (data) {

        }
    });
}

function confirmTargetAccount() {
    var targetAccountNo = $('#toAccount').val();
    $.ajax({
        url: '/customer/trans/confirmTargetAccount',
        type: 'get',
        data:{
            accountNo:targetAccountNo
        },
        dataType: 'json',
        success: function (data) {
            toAccountNo = data.accountNo;
            var cardHtml =
                "<div id=\"accountArea\">\n" +
                "    <div class=\"card bg-light mb-3 accountCard\" style=\"max-width: 18rem;\">\n" +
                "        <div class=\"card-header\" id=\"toAccountNo\">" +data.accountNo+"</div>\n" +
                "        <div class=\"card-body\">\n" +
                "            <!--<h5 class=\"card-title\">I类卡</h5>-->\n" +
                "            <div class=\"cardBalanceArea\">\n" +
                "                <div class=\"cardBalance d-flex justify-content-center align-items-center\" >\n" +
                data.name +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            $('#targetAccount').html(cardHtml);
        },
        error : function (data) {

        }
    });
}

function confirmTrans() {
    var fromAccountNo = $('#fromAccountNo').text();
    var toAccountNo = $('#toAccountNo').text();
    var transAmount = $('#transAmount').val();
    if(fromAccountNo == ""||toAccountNo == "" ||transAmount ==""){
        alert("wrong");
    }else {
        $.ajax({
            url: '/customer/trans/confirmTrans',
            type: 'post',
            data:{
                fromAccountNo:fromAccountNo,
                toAccountNo:toAccountNo,
                transAmount:transAmount
            },
            dataType: 'json',
            success: function (data) {
                alert("ok")
            },
            error : function (data) {

            }
        });
    }
}
