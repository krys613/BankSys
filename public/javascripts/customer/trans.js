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
                "                <p style=\"float: left;width: 60%\">创建日期：11 2018></p>\n" +
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

function confirmTrans() {
    var fromAccountName = $('#userName').text();
    var fromAccountNo = $('#fromAccountNo').text();
    var toAccountName = $('#toAccountName').val();
    var toAccountNo = $('#toAccountNo').val();
    var transAmount = $('#transAmount').val();
    if(fromAccountNo == ""||toAccountNo == "" ||transAmount ==""||toAccountName ==""||fromAccountName==""){
        alert("wrong");
    }else {
        getAuthorization('onetime',function (status,msg) {
            if(status){
                $.ajax({
                    url: '/employee/trans/commitTrans',
                    type: 'post',
                    data:{
                        nameFrom:fromAccountName,
                        AccountNoFrom:fromAccountNo,
                        nameTo:toAccountName,
                        AccountNoTo:toAccountNo,
                        Amount:transAmount
                    },
                    dataType: 'json',
                    success: function (data) {
                        alert("ok");
                        location.reload();
                    },
                    error : function (data) {

                    }
                });
            }
        });

    }
}
