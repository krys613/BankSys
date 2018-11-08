var Loan = (function (){
	var loan_table;//全局变量贷款信息表
	// var loginId=loginCookie.user.userId; // 获取登陆人ID

	function Init() {
		loan_table = $("#loanTable").DataTable({
			ajax:{
				"type": "POST",
                "url": "/employee/loan/getAllLoan",
                "data": function (d) {
                    d.keys = JSON.stringify($('#searchDispatchForm').serializeObject())
                }
			},
            searching: false,
            lengthChange: false,
            paging: true,
            scrollCollapse: true,
            serverSide: false,
            search: true,
            processing: true,
            scrollY: 500,
            scrollX: "100%",
            scrollXInner: "100%",
            scrollCollapse: true,
            jQueryUI: false,
            autoWidth: true,
            autoSearch: false,
            columns : [//字段
                {
                    "sClass": "text-center",
                    "data": "loanID",
                    "title": "<input type='checkbox' class='checkall' />",
                    "render": function (data, type, full, meta) {
                        return '<input type="checkbox"  class="checkchild"  value="' + data + '" />';
                    },
                    "bSortable": false
                },
                {
                    "sClass": "text-center",
                    "data": null,
                    "title": "序号",
                    "render": function (data, type, full, meta) {
                        return meta.row + 1;
                    }
                },
                {title: "贷款编号", data: "loanID"},
                {title: "姓名", data: "customerName"},
                {title: "审核状态", data: "auditingStatus"},
            ],
            columnDefs: [
                {
                    "orderable": false,
                    "searchable":false,
                    targets: 0
                },//第一行不进行排序和搜索
                {
                	defaultContent: '',
                	targets: ['_all']

                }, //所有列设置默认值为空字符串
                {
                    targets: 4,
                    render: function (data, type, row, meta) {
                        if (data == "0") {
                            return "待审核";
                        }
                        if (data == "1") {
                            return "通过";
                        }
                        if (data == "2"){
                            return "拒绝";
                        }
                    }
                }
            ],
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "未搜索到数据",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            dom: '<"top">rt<"bottom"flip><"clear">',
            initComplete: function () {
            	checkbox("loanTable");
                $("#search").click(function() {
                    search();
                });
                $("#clearSearch").click(function() {
                    clearSearch("form-control");
                });
            }
		});
	}

    function auditing(){
        var selectedRowData = loan_table.rows('.selected').data();
        if (selectedRowData.length != 1) {
            info = "请选择一条需要审批的数据！"
            alert(info);
            return;
        }
        else{
            $('#Auditing').modal('show');
            var loanID = selectedRowData[0].loanID;
            $('#Auditing').find('input[name="loanID"]').val(loanID);
        }
        //获取贷款信息
        $.ajax({
            url:'',
            type:'POST',
            data:{
                'loanID':loanID
            },
            success:function (data) {
                data=JSON.parse(data);
                $('#Auditing').find('input[name="loanerName"]').val(data[0]['Name']);
                $('#Auditing').find('input[name="loanerJob"]').val(data[0]['Job']);
                $('#Auditing').find('input[name="loanerCompany"]').val(data[0]['Company']);
                $('#Auditing').find('input[name="loanerIncome"]').val(data[0]['MonthSalary']);
                $('#Auditing').find('input[name="loanerAccount"]').val(data[0]['AccountNo']);
                $('#Auditing').find('input[name="loanerPeriod"]').val(data[0]['LoanTerm']);
                $('#Auditing').find('input[name="loanerAmount"]').val(data[0]['Amount']);
                $('#Auditing').find('input[name="loanerRate"]').val(data[0]['loanRate']);

            }
        })
    }

    //保存审批结果
    $("#commitAuditing").click(function(){
        var selectedRowData = loan_table.rows('.selected').data();
        var loanID = selectedRowData[0].loanID;
        var auditingStatus = parseInt($('#Auditing').find('select[name="auditingResult"]').val());
        $.ajax({
            type:'POST',
            url:'',
            data:{
                'loanID':loanID,
                'auditingStatus':auditingStatus
            },
            dataType:'JSON',
            async:false,
            success:function(res){
                alert(res.message);
            },
            error:function (err) {
                alert(err.message);
            }
        });
        $('#Auditing').modal('hide');
    });


    //每次加载时都先清理
	function checkbox(tableId) {
        $('#' + tableId + ' tbody').off("click", "tr");
        $('#' + tableId + ' tbody').on("click", "tr", function () {
            $(this).toggleClass('selected');
            if ($(this).hasClass("selected")) {
                $(this).find("input").prop("checked", true);
            } else {
                $(this).find("input").prop("checked", false);
            }
        });
    }

    //查找
    function search() {
        var oSettings = "";
        $("[data-column]").each(function () {
            var filedValue = $(this).attr('data-column');
            if (filedValue != "") {
                console.log($('#col' + filedValue + '_filter').val());
                oSettings = loan_table.column(filedValue).search(
                        $('#col' + filedValue + '_filter').val()
                );
            }
        });
        loan_table.draw(oSettings);
    }

    //重置
    function clearSearch(id) {

        $("." + id).each(function () {
            $(this).val("");
        });

        loan_table.columns().search("").loan_table(loan_table);
    }

    Init();

	return {
		loan_table:loan_table,
		checkbox:checkbox,
		search:search,
		clearSearch:clearSearch,
        auditing:auditing,
	}

})();
