//listen hidden input
//todo check num icheck?
$('#hiddenInput').on('input',function (e) {
    //change blocks num by length
    var val = $('#hiddenInput').val();
    var length = val.length;


    var blocks = document.getElementById('blocks');
    var blocksNum = blocks.childElementCount;
    var block = document.createElement("div");
    block.classList.add("block");

    console.log("length "+length);
    console.log("blockNum "+blocksNum);

    if(length>blocksNum){
        //add a block
        blocks.appendChild(block);
        if(length == 6 ){
            check(val);
        }
    }else{
        //remove a block
        console.log("remove");
        blocks.removeChild(blocks.lastChild);
    }
});

//input get focus wherever user click
function fixFocus() {
    $('#hiddenInput').focus();
}

//input get focus when model is shown
$('#check6pwModal').on('shown.bs.modal', function (event) {
    $('#hiddenInput').focus();
});


//post to check 6pw
function check(pw) {
    $.ajax({
        url: '/customer/check6pw',
        type: 'post',
        data :{
            password:pw
        },
        dataType: 'json',
        success: function () {
            $('#checkResult').html('success');
            $('#check6pwModal').modal('hide');
        },
        error :function () {

        }
    });
}
