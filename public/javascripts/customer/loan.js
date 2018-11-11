// 检查非空
var checkNotNull = function (obj, falseInfo) {
    if (!obj.val() || obj.val().length === 0) {
        alert(falseInfo);
        obj.focus();
        return false;
    }
    return true;
};

// 检查手机号合理性
var checkPhoneNumber = function (obj) {
    if (!(!obj.val() || obj.val().length === 0)) {
        var re = /^[0-9]*$/;
        if (!re.test(obj.val()) || obj.val().length !== 11) {
            alert("请输入合理的手机号");
            obj.val("");
            obj.focus();
        }
    }
};

// 检查身份证号合理性
var checkIdNumber = function (obj) {
    if (!(!obj.val() || obj.val().length === 0)) {
        var re = /^(([0-9]*)|([0-9]*X))$/;
        if (!re.test(obj.val()) || obj.val().length !== 18) {
            alert("请输入合理的身份证号");
            obj.val("");
            obj.focus();
        }
    }
};

// 检查银行卡号合理性
var checkCardNumber = function (obj) {
    if (!(!obj.val() || obj.val().length === 0)) {
        var re = /^[0-9]*$/;
        if (!re.test(obj.val()) || obj.val().length > 19) {
            alert("请输入合理的银行卡号");
            obj.val("");
            obj.focus();
        }
    }
};

// 检查金额合理性
var checkAmount = function (obj) {
    if (!(!obj.val() || obj.val().length === 0)) {
        var re = /^(([1-9][0-9]*\.[0-9][0-9])|([1-9][0-9]*\.[0-9])|([0]\.[0-9][0-9])|([0]\.[1-9])|([1-9][0-9]*))$/;
        if (!re.test(obj.val()) || obj.val() === "0.00") {
            alert("请输入合理的金额");
            obj.val("");
            obj.focus();
        }
    }
};

// 检查到期日合理性
var checkDate = function (obj) {
    if (!(!obj.val() || obj.val().length === 0)) {
        var re = /^[2-9][0-9][0-9][0-9][0-1][0-9][0-3][0-9]$/;
        if (!re.test(obj.val())) {
            alert("请输入合理的到期日期");
            obj.val("");
            obj.focus();
        }
    }
};


$(document).ready(function () {
    var customerName = $("#customerName");
    var job = $("#job");
    var corporation = $("#corporation");
    var monthlySalary = $("#monthlySalary");
    var loanAmount = $("#loanAmount");
    var cardNumber = $("#cardNumber");
    var timeLimit = $("#timeLimit");
    var interestRate = $("#interestRate");
    var commitBtn = $("#commitBtn");

    // 检查月薪合理性
    monthlySalary.blur(function () {
        checkAmount(monthlySalary);
    });

    // 检查贷款金额合理性
    loanAmount.blur(function () {
        checkAmount(loanAmount);
    });

    // 检查贷款银行卡号合理性
    cardNumber.blur(function () {
        checkCardNumber(cardNumber);
    });

    // 选择贷款期限后回调
    timeLimit.change(function () {
        $.ajax({
            //todo 利率
            url: "customer/loan/getRate",
            type: "get",
            data: {
                "loanTerm": timeLimit.val(),
            },
            dataType: "json",
            success: function (data) {
                interestRate.val(data.interestRate);
            },
            error: function (data) {
                alert("服务器访问失败");
            }
        });
    });

    // 确认按钮回调
    commitBtn.click(function () {
        if (!checkNotNull(customerName, "请输入姓名")) return;
        if (!checkNotNull(job, "请输入职业")) return;
        if (!checkNotNull(corporation, "请输入工作单位")) return;
        if (!checkNotNull(monthlySalary, "请输入月薪")) return;
        if (!checkNotNull(loanAmount, "请输入贷款金额")) return;
        if (!checkNotNull(cardNumber, "请输入贷款银行卡号")) return;
        if (timeLimit.val() === "0") {
            alert("请选择贷款期限");
            timeLimit.focus();
            return;
        }



        getAuthorization("onetime",function (status,msg) {
            if (status) {
                $.ajax({
                    //todo 申请贷款
                    url: "customer/loan/applyLoan",
                    type: "post",
                    data: {
                        "customerName": customerName.val(),
                        "job": job.val(),
                        "corporation": corporation.val(),
                        "monthlySalary": monthlySalary.val(),
                        "loanAmount": loanAmount.val(),
                        "cardNumber": cardNumber.val(),
                        "loanRate": interestRate.val(),
                        "loanTerm": timeLimit.val(),
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status) {
                            alert("申请已提交，请等待审核");
                            location.reload();
                        } else {
                            alert(data.error);
                        }
                    },
                    error: function (data) {
                        alert("服务器访问失败");
                    }
                });
            }
        });

    });
});

function payLoan(loanId) {
    getAuthorization("onetime",function (status,msg) {
        $.ajax({
            //todo 还款
            url: "customer/loan/payLoan",
            type: "post",
            data: {
                loanId: loanId
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var loanLine = $("#loanLine"+loanId);
                var loanText = $("#payLoan"+loanId);
                loanText.html("已还款");
                loanLine.removeClass("table-warning");

            },
            error: function (data) {
                console.log(data);
                var loanText = $("#payLoan"+loanId);
                loanText.html("付款失败，请检查账户余额");
            }
        });
    });

}
