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
                    // d.userId=loginId
                }
			},
            lengthChange : true,//是否允许用户改变表格每页显示的记录数，默认是开启
            paging : true,//是否开启本地分页，默认是开启
            processing : true,//是否显示中文提示
            scrollCollapse : true,  //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
            serverSide : false, //开启服务器模式，默认是关闭
            scrollY : true,//设置高
            scrollX : true,//设置宽度
            autoWidth : true, //是否自适应宽度
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
                } //所有列设置默认值为空字符串
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

        loan_table.columns().search("").draw();
    }

    Init();

	return {
		loan_table:loan_table,
		checkbox:checkbox,
		search:search,
		clearSearch:clearSearch,
	}

})();
