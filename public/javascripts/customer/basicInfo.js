//get method to get all Accounts

function getBalance() {
    if(checkToken()){
        //todo show data or do commit
        alert("get data");
    }else {
        $('#check6pwModal').modal("show");
    }
}

function getAccounts() {
    $.ajax({
        url: "customer/basicInfo/getAccounts",
        type: 'get',
        dataType: 'json',
        success: function (data) {
            alert(data);
        }
    });
}

//display account in basicInfo
function addCards(data) {
    var accounts = data[data];
    for (var i in accounts){

    }
}
