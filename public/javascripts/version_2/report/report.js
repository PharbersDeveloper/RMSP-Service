// var overflowTableContainer = document.getElementsByClassName("inside-div");
(function($,w){
    var overflowTableContainer = $(".inside-div");
    var overflowTableContainerEle = overflowTableContainer[0];
    var tableHeade = $(".overflow-table-head");
    var table = $(".overflow-table");
    var order = 0;
    var tablelen = table.length;
    var oldTableWidth = 0;
    var scrollBarLength = 0;
    var factorValue = "";
    var hospValue = "";
    var prodValue = "";
    var saleReportHospValue = "";

    $(function(){
        init: {
            whichTable();
            resetTableWidth();
            $(window).resize(function() {
                resetTableWidth();
            });
        }
        events: {
            //导出Excel
            $('#exportExcel').click(function(){
                var json = JSON.stringify(f.parameterPrefixModule.conditions({
                    "uuid": $('input[name="uuid"]').val(),
                    "phase": parseInt($('input[name="phrase"]').val())
                }));
                f.alert.loading(true);
                f.ajaxModule.baseCall('/submit/create', json, 'POST', function(r) {
                    if(r.status === 'ok' && r.result.data.flag === 'ok') {
                        f.alert.loading(false);
                        // w.window.open('/download/report/' + r.result.data.path);
                        w.location = '/download/file/' + r.result.data.path
                    }
                });
            });
            // 显示导出/导入excel区域按钮
            $('div[name = "toggle-export"]').click(function(e) {

                $('div[name="area-export"]').toggle();
                $(document).one("click", function(){
                    $('div[name="area-export"]').hide();
                });
                e.stopPropagation();
            });

            // 导入/导出区域的按钮冒泡阻止
            $('div[name="area-export"]').click(function(e) {
                e.stopPropagation();
            });

            $('button[name="go-phrase"]').click(function(){
                // w.location.href = "/home/" + $('input[name="uuid"]').val() + "/2"
                w.location.href = "/transition/" + $('input[name="uuid"]').val() + "/"+ $('input[name="phrase"]').val()
            });
            // 点击li时切换右边对应内容，并隐藏滚动条
            $(".menu-tab li").click(function() {

                $(".menu-tab li").removeClass("active")
                $(this).addClass("active");
                order = $(this).index();
                if(order == 0) {
                    $(this).css('borderRadius','5px 5px 0 0 ');
                    $(this).siblings().css('borderRadius','0 ');
                }else {
                    $(this).css('borderRadius','0 ');
                }
                $(".content .content-container").addClass("unvisible");
                $(".container_" + order).removeClass("unvisible");
                whichTable();
                resetTableWidth();
            });

            $("select[name='resource-allot-hospital']").change(function(){
                factorValue = $("select[name='resource-allot-dimension']").find('option:selected').text();
                // console.log(factorValue)
                var optionValue = $(this).find('option:selected').text();
                if(optionValue == "ALL") {
                    $(".resource-allot-bottom-inside table tr").show();
                    chooseHospByFactor();
                } else if (optionValue == "人民医院"){
                    $(".resource-allot-bottom-inside table tr[hosp = '人民医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '人民医院']").hide();
                } else if (optionValue == "军区医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '军区医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '军区医院']").hide()
                } else if (optionValue == "中日医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '中日医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '中日医院']").hide()
                } else if (optionValue == "铁路医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '铁路医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '铁路医院']").hide()
                } else if (optionValue == "海港医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '海港医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '海港医院']").hide()
                } else if (optionValue == "第六医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '第六医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '第六医院']").hide()
                } else if (optionValue == "小营医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '小营医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '小营医院']").hide()
                } else if (optionValue == "光华医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '光华医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '光华医院']").hide()
                } else if (optionValue == "西河医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '西河医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '西河医院']").hide()
                } else if (optionValue == "大学医院") {
                    $(".resource-allot-bottom-inside table tr[hosp = '大学医院']").show();
                    chooseHospByFactor();
                    $(".resource-allot-bottom-inside table tr[hosp != '大学医院']").hide()
                }
            });

            $("select[name='resource-allot-dimension']").change(function(){
                // factor choose
                hospValue = $("select[name='resource-allot-hospital']").find('option:selected').text();
                var optionValue = $(this).find('option:selected').text().slice(0,3);
                if(optionValue == "ALL") {
                    $(".resource-allot-bottom-inside table tr").show();
                    chooseFactorByHosp();
                } else if (optionValue == "销售代"){
                    $(".resource-allot-bottom-inside table tr[factor = '销售代表']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '销售代表']").hide()
                } else if (optionValue == "计划时") {
                    $(".resource-allot-bottom-inside table tr[factor = '计划时间分配']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '计划时间分配']").hide()
                } else if (optionValue == "实际时") {
                    $(".resource-allot-bottom-inside table tr[factor = '实际时间分配']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '实际时间分配']").hide()
                } else if (optionValue == "销售额") {
                    $(".resource-allot-bottom-inside table tr[factor = '销售额']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '销售额']").hide()
                } else if (optionValue == "推广费") {
                    $(".resource-allot-bottom-inside table tr[factor = '推广费用']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '推广费用']").hide()
                } else if (optionValue == "生产成") {
                    $(".resource-allot-bottom-inside table tr[factor = '生产成本']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '生产成本']").hide()
                } else if (optionValue == "利润（") {
                    $(".resource-allot-bottom-inside table tr[factor = '利润']").show();
                    chooseFactorByHosp();
                    $(".resource-allot-bottom-inside table tr[factor != '利润']").hide()
                }
            });

            // 销售报告中医院的选择栏
            $("select[name='sales-report-hospital']").change(function(){
                prodValue = $("select[name='sales-report-prod']").find('option:selected').text();
                var optionValue = $(this).find('option:selected').text();
                if(optionValue == "ALL") {
                    $(".sales-report-bottom-inside table tr").show();
                    chooseHospByProd();
                } else if (optionValue == "人民医院"){
                    $(".sales-report-bottom-inside table tr[salereporthosp = '人民医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '人民医院']").hide();
                } else if (optionValue == "军区医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '军区医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '军区医院']").hide()
                } else if (optionValue == "中日医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '中日医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '中日医院']").hide()
                } else if (optionValue == "铁路医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '铁路医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '铁路医院']").hide()
                } else if (optionValue == "海港医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '海港医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '海港医院']").hide()
                } else if (optionValue == "第六医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '第六医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '第六医院']").hide()
                } else if (optionValue == "小营医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '小营医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '小营医院']").hide()
                } else if (optionValue == "光华医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '光华医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '光华医院']").hide()
                } else if (optionValue == "西河医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '西河医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '西河医院']").hide()
                } else if (optionValue == "大学医院") {
                    $(".sales-report-bottom-inside table tr[salereporthosp = '大学医院']").show();
                    chooseHospByProd();
                    $(".sales-report-bottom-inside table tr[salereporthosp != '大学医院']").hide()
                }
            });

            // 销售报告中产品的选择栏
            $("select[name='sales-report-prod']").change(function(){
                saleReportHospValue = $("select[name='sales-report-hospital']").find('option:selected').text();
                var optionValue = $(this).find('option:selected').text();
                if(optionValue == "ALL") {
                    $(".sales-report-bottom-inside table tr").show();
                    chooseProdByHosp();
                } else if (optionValue == "口服抗生素"){
                    $(".sales-report-bottom-inside table tr[prod = '口服抗生素']").show();
                    chooseProdByHosp();
                    $(".sales-report-bottom-inside table tr[prod != '口服抗生素']").hide();
                } else if (optionValue == "一代降糖药") {
                    $(".sales-report-bottom-inside table tr[prod = '一代降糖药']").show();
                    chooseProdByHosp();
                    $(".sales-report-bottom-inside table tr[prod != '一代降糖药']").hide()
                } else if (optionValue == "三代降糖药") {
                    $(".sales-report-bottom-inside table tr[prod = '三代降糖药']").show();
                    chooseProdByHosp();
                    $(".sales-report-bottom-inside table tr[prod != '三代降糖药']").hide()
                } else if (optionValue == "皮肤药") {
                    $(".sales-report-bottom-inside table tr[prod = '皮肤药']").show();
                    chooseProdByHosp();
                    $(".sales-report-bottom-inside table tr[prod != '皮肤药']").hide()
                } else if (optionValue == "总体") {
                    $(".sales-report-bottom-inside table tr[prod = '总体']").show();
                    chooseProdByHosp();
                    $(".sales-report-bottom-inside table tr[prod != '总体']").hide()
                }
            });

            // 代表销售报告中的代表选择栏
            $("select[name='salesman-sale-report-salesman']").change(function(){
                salesmenProdValue = $("select[name='salesman-sale-report-prod']").find('option:selected').text();
                var optionValue = $(this).find('option:selected').text();
                // $(".salesman-sale-report-bottom-inside table tr").filter(function () {
                //
                // });
                if(optionValue == "ALL") {
                    $(".salesman-sale-report-bottom-inside table tr").show();
                    chooseSalesmenByProd();
                } else if (optionValue == "小宋"){
                    $(".salesman-sale-report-bottom-inside table tr[salesmen = '小宋']").show();
                    chooseSalesmenByProd();
                    $(".salesman-sale-report-bottom-inside table tr[salesmen != '小宋']").hide();
                } else if (optionValue == "小兰") {
                    $(".salesman-sale-report-bottom-inside table tr[salesmen = '小兰']").show();
                    chooseSalesmenByProd();
                    $(".salesman-sale-report-bottom-inside table tr[salesmen != '小兰']").hide()
                } else if (optionValue == "小木") {
                    $(".salesman-sale-report-bottom-inside table tr[salesmen = '小木']").show();
                    chooseSalesmenByProd();
                    $(".salesman-sale-report-bottom-inside table tr[salesmen != '小木']").hide()
                } else if (optionValue == "小白") {
                    $(".salesman-sale-report-bottom-inside table tr[salesmen = '小白']").show();
                    chooseSalesmenByProd();
                    $(".salesman-sale-report-bottom-inside table tr[salesmen != '小白']").hide()
                } else if (optionValue == "小青") {
                    $(".salesman-sale-report-bottom-inside table tr[salesmen = '小青']").show();
                    chooseSalesmenByProd();
                    $(".salesman-sale-report-bottom-inside table tr[salesmen != '小青']").hide()
                }
            });
            // 代表销售报告中的产品选择栏
            $("select[name='salesman-sale-report-prod']").change(function(){
                salesmenValue = $("select[name='salesman-sale-report-salesman']").find('option:selected').text();
                var optionValue = $(this).find('option:selected').text();
                if(optionValue == "ALL") {
                    $(".salesman-sale-report-bottom-inside table tr").show();
                    chooseProdBySalesmen();
                } else if (optionValue == "口服抗生素"){
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod = '口服抗生素']").show();
                    chooseProdBySalesmen();
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '口服抗生素']").hide();
                } else if (optionValue == "一代降糖药") {
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod = '一代降糖药']").show();
                    chooseProdBySalesmen();
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '一代降糖药']").hide()
                } else if (optionValue == "三代降糖药") {
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod = '三代降糖药']").show();
                    chooseProdBySalesmen();
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '三代降糖药']").hide()
                } else if (optionValue == "皮肤药") {
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod = '皮肤药']").show();
                    chooseProdBySalesmen();
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '皮肤药']").hide()
                } else if (optionValue == "总体") {
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod = '总体']").show();
                    chooseProdBySalesmen();
                    $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '总体']").hide()
                }
            });

            // 查看测评报告按钮
            $('button[name="coming-soon"]').click(function(){
                // layer.alert('即将推出');
                f.alert.loading(true);
                setTimeout(function () {
                    w.location.href = "/summary";
                },1000);
                setTimeout(function () {
                    f.alert.loading(false);
                },1100)
            })
        }
    });
    // 判断是哪个有滚动条的表格显示
    function whichTable() {
        try {
            // console.log(overflowTableContainer[0].offsetWidth);
            if (overflowTableContainer[0].offsetWidth == 0) {
                if (overflowTableContainer[1].offsetWidth == 0) {
                    if(overflowTableContainer[2].offsetWidth == 0) {
                        if(overflowTableContainer[3].offsetWidth == 0) {
                            overflowTableContainerEle = overflowTableContainer[4];
                        }else {
                            overflowTableContainerEle = overflowTableContainer[3];
                        }
                    }else {
                        overflowTableContainerEle = overflowTableContainer[2];
                    }
                } else {
                    overflowTableContainerEle = overflowTableContainer[1];
                }
            } else {
                overflowTableContainerEle = overflowTableContainer[0];
                // console.log(overflowTableContainerEle);
            }
            scrollBarLength = overflowTableContainerEle.offsetWidth - overflowTableContainerEle.clientWidth;
            overflowTableContainerEle.style.paddingRight = scrollBarLength + "px";
            // console.log("scrollBarLength"+scrollBarLength);
        } catch(err) {
            w.console.info(err)
        }

    }

    // 消除滚动条
    function resetTableWidth() {
        oldTableWidth = 0;
        // console.log(tableHeade[0].clientWidth);
        // console.log("resetTableWidth function is running");
        for (var i = 0; i < tablelen; i++) {
            // if(i === 0) {
            //     table[i].style.width = 1155 + "px";
            // }else {
                oldTableWidth = overflowTableContainer[i].clientWidth;
                table[i].style.width = tableHeade[i].clientWidth + "px";
            // }
            // oldTableWidth = overflowTableContainer[i].clientWidth;
            // table[i].style.width = tableHeade[i].clientWidth + "px";
            // table[i].style.width = oldTableWidth + scrollBarLength + "px";
        }
    }

    // 资源分配中当选择医院的时候验证维度的选择状态
    function chooseHospByFactor(){
        if(factorValue == "ALL"){
        } else if (factorValue == "销售代表") {
            $(".resource-allot-bottom-inside table tr[factor != '销售代表']").hide();
        } else if (factorValue == "计划时间分配（天）") {
            $(".resource-allot-bottom-inside table tr[factor != '计划时间分配']").hide()
        } else if (factorValue == "实际时间分配（天）") {
            $(".resource-allot-bottom-inside table tr[factor != '实际时间分配']").hide()
        } else if (factorValue == "销售额（元）") {
            $(".resource-allot-bottom-inside table tr[factor != '销售额']").hide()
        } else if (factorValue == "推广费用（元）") {
            $(".resource-allot-bottom-inside table tr[factor != '推广费用']").hide()
        } else if (factorValue == "生产成本（元）") {
            $(".resource-allot-bottom-inside table tr[factor != '生产成本']").hide()
        } else if (factorValue == "利润（元）") {
            $(".resource-allot-bottom-inside table tr[factor != '利润']").hide()
        }
    }

    // 资源分配中当选择维度的时候验证医院的选择状态
    function chooseFactorByHosp(){
        if(hospValue == "ALL") {
        } else if (hospValue == "人民医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '人民医院']").hide();
        } else if (hospValue == "军区医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '军区医院']").hide();
        } else if (hospValue == "中日医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '中日医院']").hide();
        } else if (hospValue == "铁路医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '铁路医院']").hide();
        } else if (hospValue == "海港医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '海港医院']").hide();
        } else if (hospValue == "第六医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '第六医院']").hide();
        } else if (hospValue == "小营医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '小营医院']").hide();
        } else if (hospValue == "光华医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '光华医院']").hide();
        } else if (hospValue == "西河医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '西河医院']").hide();
        } else if (hospValue == "大学医院") {
            $(".resource-allot-bottom-inside table tr[hosp != '大学医院']").hide();
        }
    }

    // 销售报告中当选择医院的时候验证产品的选择状态
    function chooseHospByProd(){
        if(prodValue == "ALL"){
        } else if (prodValue == "口服抗生素") {
            $(".sales-report-bottom-inside table tr[prod != '口服抗生素']").hide();
        } else if (prodValue == "一代降糖药") {
            $(".sales-report-bottom-inside table tr[prod != '一代降糖药']").hide()
        } else if (prodValue == "三代降糖药") {
            $(".sales-report-bottom-inside table tr[prod != '三代降糖药']").hide()
        } else if (prodValue == "皮肤药") {
            $(".sales-report-bottom-inside table tr[prod != '皮肤药']").hide()
        } else if (prodValue == "总体") {
            $(".sales-report-bottom-inside table tr[prod != '总体']").hide()
        }
    }

    // 销售报告中当选择产品的时候验证医院的选择状态
    function chooseProdByHosp(){
        if(saleReportHospValue == "ALL") {
        } else if (saleReportHospValue == "人民医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '人民医院']").hide();
        } else if (saleReportHospValue == "军区医院") {
            $(".sales-report-bottom-inside tr[salereporthosp != '军区医院']").hide();
        } else if (saleReportHospValue == "中日医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '中日医院']").hide();
        } else if (saleReportHospValue == "铁路医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '铁路医院']").hide();
        } else if (saleReportHospValue == "海港医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '海港医院']").hide();
        } else if (saleReportHospValue == "第六医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '第六医院']").hide();
        } else if (saleReportHospValue == "小营医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '小营医院']").hide();
        } else if (saleReportHospValue == "光华医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '光华医院']").hide();
        } else if (saleReportHospValue == "西河医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '西河医院']").hide();
        } else if (saleReportHospValue == "大学医院") {
            $(".sales-report-bottom-inside table tr[salereporthosp != '大学医院']").hide();
        }
    }

    // 代表销售报告中当选择代表的时候验证产品的选择状态
    function chooseSalesmenByProd(){
        if(salesmenProdValue == "ALL"){
        } else if (salesmenProdValue == "口服抗生素") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '口服抗生素']").hide();
        } else if (salesmenProdValue == "一代降糖药") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '一代降糖药']").hide()
        } else if (salesmenProdValue == "三代降糖药") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '三代降糖药']").hide()
        } else if (salesmenProdValue == "皮肤药") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '皮肤药']").hide()
        } else if (salesmenProdValue == "总体") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmenprod != '总体']").hide()
        }
    }
    // 代表销售报告中当选择代表的时候验证产品的选择状态
    function chooseProdBySalesmen(){
        if(salesmenValue == "ALL") {
        } else if (salesmenValue == "小宋") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmen != '小宋']").hide();
        } else if (salesmenValue == "小兰") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmen != '小兰']").hide();
        } else if (salesmenValue == "小木") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmen != '小木']").hide();
        } else if (salesmenValue == "小白") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmen != '小白']").hide();
        } else if (salesmenValue == "小青") {
            $(".salesman-sale-report-bottom-inside  table tr[salesmen != '小青']").hide();
        }
    }


})(jQuery, window);
