(function($, w) {

    var salesmen = ['小宋', '小白', '小兰', '小木', '小青'];
    var hospListIndex = 2;
    var oldHospListIndex = 0;
    // TODO: 从2018年3月12日后，暂时封印ES6的写法, IE11一下不支持
    // Persion Pie
    var getPersionPieData = function(percent) {
        return [{
            value: percent,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            "offset": 0,
                            "color": '#2496db',

                        }, {
                            "offset": 1,
                            "color": '#1BE8F2'
                        }]),
                    shadowBlur: 10,
                    shadowColor: '#1195C4',

                }
            }
        }, {
            value: 100 - percent,
            itemStyle: {
                normal: {
                    color: 'transparent'
                }
            }
        }];
    };

    // Total Budget Bar
    var getTotalBudgetData = function(percent) {
        return [{
            value: percent,
            itemStyle: {
                normal: {
                    barBorderRadius: [20, 25, 25, 20],
                    color: {
                        type: 'bar',
                        color:'red',
                        colorStops: [{
                            offset: 0,
                            color: '#2496db' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#1BE8F2' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        }]
    };

    // Allot Time Pie
    var getAllotTimePieData = function(percents) {
        var tmp = [];
        $.each(percents, function(i, v){
            tmp.push(v);
        })
        return tmp;
        // return [
        //     {value:30, name:'协助拜访'},
        //     {value:31, name:'能力辅助'},
        //     {value:3, name:'例会/团建'},
        //     {value:8, name:'KPI分析'},
        //     {value:12, name:'行政工作'},
        //     {value:16, name:'未分配'}
        // ];
    }

    // salesman分配时间
    var setPersonData = function(id, p) {
        var percent = p || 0;
        //document.getElementById(id)
        var personPie = echarts.init($('.person-details-info .detail div[name="' + id + '"]')[0]);
        var option = {
            // backgroundColor: '#474B5A',
            title: {
                text: percent + "天",
                x: 'center',
                y: 'center',
                textStyle: {
                    color: '#ccced8',
                    // fontWeight: 'bolder',
                    fontSize: 24,
                }
            },
            series: [{
                    type: 'pie',
                    radius: ['85%', '100%'],
                    silent: true,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            normal: {
                                color: '#454752',
                                shadowBlur: 10,
                                shadowColor: '#454752',
                            }
                        }
                    }],
                    animation: false
                },{
                    type: 'pie',
                    radius: ['85%', '100%'],
                    silent: true,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            normal: {
                                color: '#454752',
                                shadowBlur: 10,
                                shadowColor: '#454752'
                            }
                        }
                    }],
                    animation: false
                },{
                    name: 'main',
                    type: 'pie',
                    radius: ['85%', '100%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: getPersionPieData(percent),
                    hoverAnimation: false,
                    animationEasingUpdate: 'cubicInOut',
                    animationDurationUpdate: 500
                }
            ]
        };
        personPie.setOption(option);
    };

    // 总预算
    var setTotalBudget = function(id, p) {
        var percent = p || 0;
        var totalBudgetBar = echarts.init(document.getElementById(id));
        option = {
            xAxis: [{
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {show: false},
                splitLine: {show: false}
            }],
            yAxis: [{
                type: 'category',
                data: [''],
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                    }
                }
            }],
            series: [{
                name: ' ',
                type: 'bar',
                barWidth: 24,
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#393D47',
                        barBorderRadius: [20, 25, 25, 20]
                    }
                },
                barGap: '-100%',
                barCategoryGap: '50%',
                data: [100],
            }, {
                name: ' ',
                type: 'bar',
                barWidth: 24,
                label: {
                    normal: {
                        show: true,
                        color: '#D5D5D7',
                        position: ['100', '30%'],
                        formatter: '{c}%',
                    }
                },
                data: getTotalBudgetData(percent)
            }]
        };
        totalBudgetBar.setOption(option);
    };

    // 经理分配时间
    var setAllotTime = function(id, p) {
        var allotTimePie = echarts.init(document.getElementById(id));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#00ACFF', '#356BFF', '#6BD8FA', '#D6E9F7', '#374066', '#DCDBDC'],
            series: [
                {
                    name:'分配时间',
                    type:'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    label: { //标签的位置
                        normal: {
                            show: true,
                            position: 'inside', //标签的位置
                            formatter: "{d}%",
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: getAllotTimePieData(p)
                }
            ]
        };
        allotTimePie.setOption(option);
    }

    // 查看详情Btn
    var detailsBtn = function() {
        $('div[name="message-box"]').hide();
        $('div[name="input-box"]').hide();
        $('div[name="answer-tab"]').hide();
        $('div[name="resource-info"]').show();
    };

    // 简单切换HospitalInfo 多的情况有性能问题，后续重构再改吧
    var switchHospitalInfo = function(hospital_name) {
        $.each($('div[class*="hosp-input-info"]'), function(i, v) {
            $(v).finish();
            if($(v).attr("name") === hospital_name) {
                $(v).show();
                $(v).css("display","block");
                $(v).addClass('slideInRight');
                $(v).removeClass('slideOutRight');
            } else {
                // $(v).hide("slow");
                $(v).addClass('slideOutRight').delay(300).hide(300);
                $(v).removeClass('slideInRight');

            }
        });
    }

    // 业务决策于管理决策切换
    var switchSalesAndPersonel = function(identify) {
        var $div = $('.hosp-input-info').filter(function(index){
            return $(this).css("display") === "block";
        });
        $(".personal-training").finish();
        if(identify === "业务决策") {
            $div.find(".sales-planning").show();
            $div.find(".sales-planning").addClass('slideInRight');
            $(".personal-training").removeClass('zoomIn')
            $(".personal-training").addClass('zoomOut').delay(400).hide(400);
            $('.home .message-box .hosp-array-masklayer').hide();
        } else {
            $(".personal-training").show();
            $(".personal-training").removeClass('zoomOut')
            $(".personal-training").addClass('zoomIn');
            $div.find(".sales-planning").hide();
            $('.home .message-box .hosp-array-masklayer').show();
        }
    }

    // Budget 输入超过100 验证
    var verifyBudgetlg = function() {
        var inputs = $('div[name="bottom"] div[name="hosp-info"] input[name="input-budget"]');
        var sum = 0;
        $.each(inputs, function(i, v) {
            sum += parseInt($(v).val() || 0);
        });
        if(sum > 100) {return false;}else {return true;}
    }

    // 只要选中代表 budget 就必须填写 验证
    var verifyBudgeteq = function() {
        var result = false;
        var selected = $('div[name="hosp-info"] select option:selected').filter(function(i, dom){
            return $(dom).val() !== "" && $(dom).val() !== "不分配";
        });
        $.each(selected, function(i, v){
            var input = $('input[name="input-budget"][hospital-name="'+$(v).attr("hospital-name")+'"]');
            if(input.val() === "") {
                f.alert.alert_warn("警告", $(v).attr("hospital-name") + "下的"
                        + input.attr("pharbers-type") + "未分配");
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 代表时间大于100 验证
    var verifyTimelg = function() {
        var array = getAllInputAllotTime();
        var trainingArray = getTrainingTotalInput();
        var result = false;
        $.each(salesmen, function(i, name) {
            var sum = 0;
            var allottArray = array.filter(function(obj, index){ return obj.salesmen === name;});
            var trainingInput = trainingArray
                .filter(function(index, dom){return dom.salesmen === name}).get(0);
            $.each(allottArray, function(n, time) {sum += time.allotTime});
            sum += trainingInput.allotTime
            if(sum > 100) {
                f.alert.alert_warn("警告", name+" 的分配时间已超出上限(100天)，<br/>请重新分配！");
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 代表时间是否等于 0 验证
    var verifyTimeeq = function() {
        var array = getAllInputAllotTime();
        var result = false;
        $.each(salesmen, function(i, name) {
            var sum = 0;
            var allottArray = array.filter(function(obj, index){ return obj.salesmen === name;});
            $.each(allottArray, function(n, time) {sum += time.allotTime});
            if(sum === 0) {
                f.alert.alert_warn("警告", name+"的沟通时间未分配");
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 经理时间大于100 验证
    var verifyManageTimelg = function() {
        var array = getManageAllotTime();
        var sum = 0;
        $.each(array, function(i, v){
            $.each(v.apply, function(i, data){
                    sum += data.days
            });
        });
        if(sum > 100) {
            f.alert.alert_warn("警告", "经理的分配时间已超出上限(100天)，<br/>请重新分配！");
            return false;
        } else return true;
    }

    // 经理协作拜访时间大于代表 验证
    var verufyManageVisitTimelg = function(array) {
        var tmp = $(array).filter(function(index, dom){
            return dom.type === "实地协访";
        }).map(function(index, dom){
            return dom.apply;
        }).get(0);

        var result = false;
        $.each(salesmen, function(i, name) {
            var sum = 0;
            var allottArray = getAllInputAllotTime().filter(function(obj, index){ return obj.salesmen === name;});
            $.each(allottArray, function(n, time) {sum += time.allotTime});
            var personal = $(tmp).filter(function(index, dom){
                return dom.personal === name
            });
            if(personal.get(0).days > sum) {
                // f.alert.alert_warn("警告", "经理协作时间大于，代表："+name+"所分配时间");
                f.alert.alert_warn("警告", "经理协访时间不可大于 " + name + " 被分配的沟通时间！");
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 当前医院是否选中代表 验证
    var verifyCurrHospitalSalesMen = function(hosp_identify) {
        var selected = $('div[name="'+hosp_identify+'"] select option:selected');
        if(selected.val() == "") {return false;} else {return true;}
    }

    // 填写Budget但未选择代表 验证
    var verifyBudgetNotSalesMen = function() {
        var result = false;
        $.each(getAllInputBudget(), function(i, v) {
            if(v.salesmen === "" && v.budget > 0) {
                // f.alert.alert_warn("提示", v.hospital+"未选择代表");
                f.alert.alert_warn("提示", "请先指派代表，才可部署预算分配！");
                result = false;
                return false;
            } else {result = true;}
        });
        return result;
    }

    // 提交检查所有人是否被选中 验证
    var verifyAllSalesMenIsSelected = function() {
        var result = false;
        var allSelectedSalesMen = $('div[name="hosp-info"]').filter(function(index, dom){
            var selected = $(dom).find('select option:selected');
            return selected.val() !== "" && selected.val() !== "不分配"
        }).map(function(index, dom){
            return $(dom).find('select option:selected').val();
        }).toArray();

        $.each(salesmen, function(i, v){
            if ($.inArray(v, allSelectedSalesMen) < 0) {
                result = false;
                // f.alert.alert_warn("提示", v + "代表漏选！");
                f.alert.alert_warn("提示", "每位代表都需要被分配销售任务，请再次检查！")
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 所有输入框是否为数字 验证
    var verifyAllInputIsNumber = function() {
        var result = false;
        var inputs = $('input').filter(function(index, dom){
            return $(dom).attr("disabled") !== "disabled" && $(dom).val() !== "" && $(dom).attr("type") !== "hidden";
        });
        $.each(inputs, function(i, v){
            if( !regexExce(numberzzs, $(v).val().replace(/,/g, "")) ) {
                // f.alert.alert_warn("警告", ($(v).attr("hospital-name") || "") + " "+ ($(v).attr("pharbers-type") || "") +" 不是正整数")
                f.alert.alert_warn("警告", "请输入正整数");
                $(v).val("");
                // $(v).focus();
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        if(inputs.toArray().length === 0){result = true;}
        return result;
    }

    // 管理决策非空 验证
    var verifyAllPersonnelTraining = function() {
        var result = false;
        var reVal = $('div[name="personal-training"] input').filter(function(index, dom){
            return $(dom).attr("disabled") !== "disabled";
        });
        $.each(reVal, function(i, v){
            if($(v).val() === "") {
                f.alert.alert_warn("提示", "您的 管理决策 尚未完成，请再次检查！");
                result = false;
                return false;
            } else {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 所有医院是否分配 验证
    var verifyAllHospitalAllot = function() {
        var result = false;
        var nonSelectedHosp =
            $('div[name="input-box"] div[name="bottom"] div[name="hosp-info"] '+
              'select option:selected').filter(function(index, dom) {
                  return $(dom).val() === "";
        });
        $.each(nonSelectedHosp, function(i, v) {
            // f.alert.alert_warn("提示", $(v).attr("hospital-name") + "未分配代表");
            f.alert.alert_warn("提示", "尚未对 " + $(v).attr("hospital-name") + " 进行 业务决策，请重新检查！");
            result = false;
            return false;
        });
        if(nonSelectedHosp.length === 0) result = true;
        return result;
    }

    // 分配的医院下不能有空 验证
    var verifyAllotHositalNotNull = function() {
        var result = false;
        var allotSelectedHospInput =
            $('div[name="input-box"] div[name="bottom"] div[name="hosp-info"] '+
              'select option:selected').filter(function(index, dom) {
                  return $(dom).val() !== "" && $(dom).val() !== "不分配";
        }).map(function(index, dom){
            return $('div[name="input-box"] div[name="bottom"] .hosp-input-info')
                .filter('[name="' + $(dom).attr("hospital-name") + '"]').find('input')
                .not('[disabled="disabled"]')
        });

        $.each(allotSelectedHospInput, function(i, hospDiv) {
            $.each(hospDiv,function(n, v) {
                if($(v).val() === "") {
                    // f.alert.alert_warn("提示", $(v).attr("hospital-name") + " "
                    //     + $(v).attr("pharbers-type") + "内容为空")
                    //
                    // f.alert.alert_warn("提示", "尚未分配 " + $(v).attr("hospital-name") + " "
                    //     + $(v).attr("pharbers-type"))
                    f.alert.alert_warn("提示", $(v).attr("hospital-name") + " 的 业务决策 尚未完成，请再次检查！")
                    result = false;
                    return false;
                } else {
                    result = true;
                    return true;
                }
            });
            return result;
        });
        return result;
    }

    // 获取所有input Budget输入
    var getAllInputBudget = function() {
        var tmp = [];
        $.each($('.hosp-input-info div[name="hosp-info"]'), function(i, dom){
            var selected = $(dom).find('select option:selected');
            var budgetNum = $(dom).find('input[name="input-budget"]');
            tmp.push({
                salesmen: $(selected).val(),
                budget: $(budgetNum).val(),
                hospital: $(selected).attr("hospital-name")
            });
        });
        var ftmp = tmp.filter(function(obj, index) { return obj.budget >= 0 });
        return ftmp;
    }

    // 计算所有Input Budget输入
    var calcBudget = function() {
        var sum = 0;
        // $('ul[name="hosp-list"] li span[name="budget"]').text("——");
        var options = $('.selected-salesman').find('select option:selected').not('[value=""]');

        $.each(options, function(i, v){
            $.each(getAllInputBudget(), function(i, d) {
                if($(v).attr("hospital-name") === d.hospital) {
                    sum += parseInt(d.budget || 0);
                    $('ul[name="hosp-list"]').find('li[name="' + d.hospital + '"] span[name="budget"]').text(parseInt(d.budget || 0));
                    // w.console.info($(v).val())
                    if(d.budget === "" && $(v).val() !== "不分配") {
                        $('ul[name="hosp-list"]').find('li[name="' + d.hospital + '"] span[name="budget"]').text("——");
                    }
                    if(($(v).val() || "") === "不分配" && d.budget === "") {
                        $('ul[name="hosp-list"]').find('li[name="' + $(v).attr("hospital-name") + '"] span[name="budget"]').text("0");
                    }
                }
                // sum += parseInt(v.budget) || 0;
                // if(v.budget === ""){
                //     $('ul[name="hosp-list"]').find('li[name="' + v.hospital + '"] span[name="budget"]').text("——");
                // } else {
                //     $('ul[name="hosp-list"]').find('li[name="' + v.hospital + '"] span[name="budget"]').text(v.budget);
                // }
            });

        });
        // $.each(getAllInputBudget(), function(i, v) {
        //     sum += parseInt(v.budget) || 0;
        //     if(v.budget === ""){
        //         $('ul[name="hosp-list"]').find('li[name="' + v.hospital + '"] span[name="budget"]').text("——");
        //     } else {
        //         $('ul[name="hosp-list"]').find('li[name="' + v.hospital + '"] span[name="budget"]').text(v.budget);
        //     }
        // });

        setTotalBudget("total-budget", sum);
    }

    // 获取人员培训的代表分配的总时间Input
    var getTrainingTotalInput = function() {
        //人员培训下代表产品培训input
        var trainingInput = $('div[name="personal-training"]')
                            .find('div[name="input-training"]')
                            .find('input[name="产品培训"]');
        //人员培训下团建/列会input
        var meetingInput = $('div[name="personal-training"]')
                            .find('div[name="input-training"]')
                            .find('input[name="团队例会和团建"]');
        //人员培训下1对1辅导
        var coachInput = $('div[name="personal-training"]')
                            .find('div[name="input-training"]')
                            .find('input[name="能力辅导"]');

        return $(salesmen).map(function(index, sm) {
            return {
                salesmen: sm,
                allotTime:
                    parseInt(trainingInput.filter('[personal="'+sm+'"]').val() || 0)+
                    parseInt(meetingInput.filter('[personal="经理"]').val() || 0)+
                    parseInt(coachInput.filter('[personal="'+sm+'"]').val() || 0)
            }
        });
    };

    // 获取代表所有的input AllotTime输入
    var getAllInputAllotTime = function() {
        var tmp = [];
        //人员培训下代表产品培训input
        // var trainingInput = $('div[name="personal-training"]')
        //                     .find('div[name="input-training"]')
        //                     .find('input[name="产品培训"]');
        // //人员培训下团建/列会input
        // var meetingInput = $('div[name="personal-training"]')
        //                     .find('div[name="input-training"]')
        //                     .find('input[name="团队例会和团建"]');
        // //人员培训下1对1辅导
        // var coachInput = $('div[name="personal-training"]')
        //                     .find('div[name="input-training"]')
        //                     .find('input[name="能力辅导"]');


        // var totalSalesMenInput = $('div[name="personal-training"]')
        //                         .find('div[name="input-training"]')
        //                         .find('input[disabled="disabled"]');

        $.each($('.hosp-input-info'), function(i, dom){
            var selected = $(dom)
                        .find('div[name="hosp-info"] select option:selected');
            //医院下input
            var inputs = $(dom).find('input[name="prod_hours"]');

            var sumInput = 0;
            $.each(inputs, function(n, v){
                sumInput += parseInt($(v).val()) || 0;
            });

            // var product = trainingInput.filter(function(index, dom){
            //     return $(dom).attr("personal") === $(selected).val();
            // });
            //
            // var coach = coachInput.filter(function(index, dom){
            //     return $(dom).attr("personal") === $(selected).val();
            // });

            tmp.push({
                salesmen: $(selected).val(),
                allotTime: //(parseInt($(product).val()) || 0)
                            //+ (parseInt($(meetingInput).val()) || 0)
                            //+ (parseInt($(coach).val()) || 0)
                            sumInput,
                hospital: $(selected).attr("hospital-name")
            });
        });

        return tmp;
    }

    // 计算代表时间
    var calcAllotTime = function(inputObj) {
        try {
            var trainingArray = getTrainingTotalInput();
            // w.console.info(trainingArray)
            if(verifyTimelg()) {
                $.each(salesmen, function(i, name) {
                    var sum = 0;
                    var allottArray = getAllInputAllotTime()
                        .filter(function(obj, index){ return obj.salesmen === name;});
                    var trainingInput = trainingArray
                        .filter(function(index, dom){return dom.salesmen === name}).get(0);
                    // w.console.info(trainingInput)
                    sum += trainingInput.allotTime
                    $.each(allottArray, function(n, time) {sum += time.allotTime});
                    setPersonData(name, sum);
                });
                // setTipsDays(inputObj);
            } else {
                if (inputObj[0].tagName === "SELECT") {
                    var hospital = inputObj.find('option:selected')
                                    .attr("hospital-name");

                    var localStorage = window.localStorage.
                                                getItem("select-" + hospital);
                    window.localStorage.
                            setItem("select-" + hospital, localStorage);

                    var identify = 'div[name="' + hospital + '"] ' +
                                    'select option[value="' + localStorage + '"]'

                    $(identify).prop("selected", true);
                    w.console.info(localStorage)
                } else {
                    inputObj.val("");
                }
            }
        } catch(err) {
            w.console.error(err)
        }
    }

    // 显示选择代表
    var showSelectSalesMen = function() {
        var selected = $('.selected-salesman').find('select option:selected').not('[value=""]');
        // selected.not('[value=""]')
        $.each(selected, function(i, v){
            var salesmen = "——";
            var salesmenpic = "salesmen-picture";
            if($(v).val() === "") salesmen = "——"; else salesmen = $(v).val();
            if($(v).val() === "不分配" || $(v).val() === "") {salesmenpic = "salesmen-picture";} else {salesmenpic = $(v).val()}

            $('ul[name="hosp-list"]').find('li[name="' + $(v).attr("hospital-name") + '"]').find('span[name="salesmen"]').text(salesmen);
            $('div[name="' + $(v).attr("hospital-name") + '"] .salesman-picture img').attr("src", asset_resources+"images/version_2/" + salesmenpic + ".png")
        });

    }

    // 获取经理分配时间所有Input 输入
    var getManageAllotTime = function() {
        var tmp = [];
        var personalDiv = $('div[name="personal-training"]');

        //经理协助拜访input
        var visit = $(personalDiv)
                     .find('div[name="input-personal"]')
                     .find('div[name="input-manager"]')
                     .find('input');
         //人员培训下1对1辅导
         var coachInput = $(personalDiv)
                             .find('div[name="input-training"]')
                             .find('input[name="能力辅导"]');
        //人员培训下团建/列会input
        var meetingInput = $(personalDiv)
                            .find('div[name="input-training"]')
                            .find('input[name="团队例会和团建"]');
        // KPIinput
        var kpi = $(personalDiv)
                    .find('div[name="input-display"]')
                    .find('input[name="KPI 报告分析"]');
        // 行政input
        var administrative = $(personalDiv)
                                .find('div[name="input-display"]')
                                .find('input[name="行政工作"]');


        var array = [visit, coachInput, meetingInput, kpi, administrative];
        $.each(array, function(i, o) {
            var obj = o.map(function(index, dom) {
                return {
                    personal: $(dom).attr("personal"),
                    days: parseInt($(dom).val()) || 0
                }
            });
            tmp.push({
                type: $(o).attr('name'),
                apply: obj
            });

        });

        return tmp;
    }

    // 计算经理分配时间
    var calcManageAllotTime = function(inputObj) {
        var result = getManageAllotTime();
        if(!verifyManageTimelg()) {
            inputObj.val("");

        } else if(!verufyManageVisitTimelg(result)) {
            inputObj.val("");
        }

        var reval = $(result).map(function(index, dom){
            var sum = 0;
            $.each(dom.apply, function(i, v){sum += v.days})
            return {
                name: dom.type,
                value: sum
            }
        });
        setTipsDays(inputObj);
        reval = reval.toArray();
        reval.push({name: "未分配", value: parseInt($('span[name="other-days"]').text() || 0)});
        setAllotTime("hospcode-allot-time", reval);
    }

    // 计算人员培训的分配天数并显示
    var setTipsDays = function(inputObj) {
        var total = 100;
        var visitSum = 0;
        var coachSum = 0;
        var kpiSum = 0;
        var administrativeSum = 0;
        var manageResult = getManageAllotTime();

        //人员培训下代表产品培训input
        var trainingInput = $('div[name="personal-training"]')
                            .find('div[name="input-training"]')
                            .find('input[name="产品培训"]');


        var visitArray = $(manageResult).filter(function(index, dom){
            return dom.type === "实地协访";
        });

        var coachArray = $(manageResult).filter(function(index, dom){
            return dom.type === "能力辅导";
        });

        var kpiArray = $(manageResult).filter(function(index, dom){
            return dom.type === "KPI 报告分析";
        });

        var administrativeArray = $(manageResult).filter(function(index, dom){
            return dom.type === "行政工作";
        });

        var meetingSum =  $(manageResult).filter(function(index, dom){
            return dom.type === "团队例会和团建";
        }).get(0).apply.get(0).days;



        $.each(visitArray, function(i, v) {
            $.each(v.apply, function(n, d){
                visitSum += parseInt(d.days)
            });
        });

        $.each(kpiArray, function(i, v) {
            $.each(v.apply, function(n, d){
                kpiSum += parseInt(d.days)
            });
        });

        $.each(administrativeArray, function(i, v) {
            $.each(v.apply, function(n, d){
                administrativeSum += parseInt(d.days)
            });
        });

        $.each(coachArray, function(i, v){
            $.each(v.apply, function(n, d){
                coachSum += parseInt(d.days)
                var product = trainingInput.filter(function(index, dom){
                    return $(dom).attr("personal") === d.personal;
                });
                var coach = coachArray.get(0).apply.filter(function(index, dom){
                    return dom.personal === d.personal
                });

                $('div[name="input-training"] input[name="'+d.personal+'"]')
                .val( parseInt($(product).val() || 0)
                    + parseInt(coach.get(0).days || 0)
                    + parseInt(meetingSum || 0))

            });
        });
        // debugger;
        $('div[name="input-display"] span[name="meeting-days"]').text(meetingSum);
        $('div[name="input-display"] span[name="coach-days"]').text(coachSum);
        $('div[name="input-display"] span[name="visit-days"]').text(visitSum);
        var otherDays = total - meetingSum - coachSum - visitSum - kpiSum - administrativeSum;
        $('div[name="input-display"] span[name="other-days"]').text(otherDays);

    }

    // 删除空的Option
    var removeSelectNoneOption = function() {
        $('.hosp-input-info select').find('option:selected').filter(function(index, dom){
            return $(dom).val() !== ""
        }).parent().find('option').filter(function(index, dom){
            return $(dom).val() === "";
        }).remove();
    }

    $(function(){

        init: {
            showSelectSalesMen();
            calcBudget();
            calcAllotTime();
            setTipsDays();
            calcManageAllotTime();
            removeSelectNoneOption();
            window.localStorage.clear();
            var uuid = $('input:hidden[name="uuid"]').val();
            f.cookieModule.setCookie("uuid", uuid);
            var phrase = $('input[name="phase"]').val();
            $.each($('.hosp-input-info select'), function(i, v){
                if($(v).val() === "不分配") {
                    var inputs = $('div[name="'+$(v).find('option:selected')
                        .attr("hospital-name")+'"]')
                        .find('input')
                        .not('[pharbers-type="皮肤药"]')
                        .not('[name="hospital-code"]');

                    if(phrase == 2) {
                        inputs = $('div[name="'+$(v).find('option:selected')
                            .attr("hospital-name")+'"]')
                            .find('input')
                            .not('[name="hospital-code"]')
                            .not('[hospital-name="铁路医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="海港医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="第六医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="小营医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="光华医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="大学医院"][pharbers-type="皮肤药"]')
                    }
                    // console.info(inputs)
                    inputs.val("");
                    inputs.prop("disabled", true);
                    calcAllotTime($(v));
                    showSelectSalesMen();
                    calcBudget();
                }


            });
            $.each($('div[name="hosp-budget"]'), function(i, v){
                $(this).attr('data-value', $(v).val().replace(/,/g, ""));
                $(this).val(f.thousandsModule.formatNum($(this).attr('data-value')));
            });
            $.each($('input[name="prod_value"]'), function(i, v){
                $(this).attr('data-value', $(v).val().replace(/,/g, ""));
                $(this).val(f.thousandsModule.formatNum($(this).attr('data-value')));
            });
            // $('div[name="hosp-budget"] input[name="prod_value"]').keyup(function(){
            //     $(this).attr('data-value', $(this).val().replace(/,/g, ""))
            //     $(this).val(f.thousandsModule.formatNum($(this).attr('data-value')))
            // });
        }

        events: {
            // 答题页 查看详情按钮
            $('button[name="details-btn"]').click(function() {
                detailsBtn();
            });

            // 医院列表点击事件
            $('ul[name="hosp-list"] li').click(function() {
                $(this).addClass("hospactive");
                $(this).siblings().removeClass("hospactive");
                $('div[name="answer-tab"] div[name="btn-group"] button:eq(0)').attr('disabled',"true");
                switchHospitalInfo($(this).attr("name"));
            });

            //答题页 业务决策与管理决策按钮
            $('div[name="answer-tab"] div[name="btn-group"] button').click(function(){
                // if($())
                if($(this).text() == "管理决策") {
                    hospListIndex = $('.hospactive').index();
                    oldHospListIndex = $('.hospactive').index();
                    $('ul[name="hosp-list"] li').addClass("hospactive");
                } else {

                    hospListIndex = $('.hospactive').index();
                    $('ul[name="hosp-list"] li').removeClass("hospactive");
                    $('ul[name="hosp-list"] li:eq('+(oldHospListIndex)+')').addClass("hospactive");
                }
                $(this).addClass("active");
                $(this).attr('disabled',"true");
                $(this).siblings().removeAttr("disabled");
                $(this).siblings().removeClass("active");
                switchSalesAndPersonel($(this).text());
            });

            // 分配推广预算keyup设置图
            $('div[name="bottom"] div[name="hosp-info"] input[name="input-budget"]')
                .keyup(function() {
                if(verifyBudgetNotSalesMen() && verifyAllInputIsNumber()) {
                    calcBudget($(this));
                } else {
                    $(this).val("");
                }
            });

            // 分配推广预算blur设置检查超出100
            $('div[name="bottom"] div[name="hosp-info"] input[name="input-budget"]')
                .blur(function() {
                if(!verifyBudgetlg()) {
                    f.alert.alert_warn("警告", "总预算超出上限，请重新分配！");
                    $(this).val("");
                    calcBudget();
                }
            });

            // 分配沟通时间keyup
            $('div[name="hosp-budget"] input[name="prod_hours"]' +
            ', div[name="personal-training"] div[name="input-training"] input')
                .keyup(function() {
                if(verifyAllInputIsNumber()) {
                    var that = this;
                    calcAllotTime($(that));
                    calcManageAllotTime($(that));
                }
            });

            // 分配沟通时间blur
            $('div[name="hosp-budget"] input[name="prod_hours"]' +
            ', div[name="personal-training"] div[name="input-training"] input')
                .blur(function() {
                var that = this;
                calcAllotTime($(that))
                calcManageAllotTime($(that));
                if(!verifyCurrHospitalSalesMen($(that).attr("hospital-name"))) {
                    f.alert.alert_warn("提示", "请先指派代表，才可设置沟通时间！");
                    $(that).val("");
                }

            });

            // 指标设定keyup
            $('div[name="hosp-budget"] input[name="prod_value"]').keyup(function(){
                verifyAllInputIsNumber();
                $(this).attr('data-value', $(this).val().replace(/,/g, ""));
                $(this).val(f.thousandsModule.formatNum($(this).attr('data-value')));
            });

            // salesmen select change
            $('.hosp-input-info select').change(function() {
                var phrase = $('input[name="phase"]').val();

                var that = this;
                var localStorage = window.localStorage.
                                            getItem("select-"+
                                            $(that).find('option:selected')
                                            .attr("hospital-name"));

                removeSelectNoneOption();
                var inputs = $('div[name="'+$(that).find('option:selected')
                            .attr("hospital-name")+'"]')
                            .find('input')
                            .not('[pharbers-type="皮肤药"]')
                            .not('[name="hospital-code"]');

                if(phrase == 2) {
                    inputs = $('div[name="'+$(this).find('option:selected')
                            .attr("hospital-name")+'"]')
                            .find('input')
                            .not('[name="hospital-code"]')
                            .not('[hospital-name="铁路医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="海港医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="第六医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="小营医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="光华医院"][pharbers-type="皮肤药"]')
                            .not('[hospital-name="大学医院"][pharbers-type="皮肤药"]')
                }

                if($(that).val() === "不分配") {
                    if(localStorage == null) {
                        f.alert.alert_warn("提示",
                            "若选择不分配代表，则放弃该医院销售任务，无法分配预算、设定指标、沟通时间。")
                        inputs.val("");
                        inputs.prop("disabled", true);
                        calcBudget();
                    } else {
                        f.alert.choose_info("提示",
                            ["是", "否"],
                            "若选择不分配代表，则放弃该医院销售任务，无法分配预算、设定指标、沟通时间。",
                            function () {
                                inputs.val("");
                                inputs.prop("disabled", true);
                                calcAllotTime($(that));
                                showSelectSalesMen();
                                calcBudget();
                            },
                            function () {
                                var identify = 'div[name="' +
                                                $(that).find('option:selected')
                                                    .attr("hospital-name") + '"] ' +
                                                'select option[value="' + localStorage + '"]'

                                $(identify).prop("selected", true);
                                showSelectSalesMen();
                                calcAllotTime();
                            });
                    }

                } else {
                    calcAllotTime($(that));
                    showSelectSalesMen();
                    window.localStorage.
                        setItem("select-" + $(that).
                                find('option:selected').attr('hospital-name'),
                                $(that).val());
                    inputs.prop("disabled", false);
                }
                showSelectSalesMen();
                calcBudget();
            });

            // 实地协防keyup
            $('div[name="personal-training"] div[name="input-manager"] input, '+
                'div[name="input-display"] input').keyup(function(){
                if(verifyAllInputIsNumber()) {
                    var that = this;
                    calcManageAllotTime($(that));
                }
            });

            // 实地协防blur
            $('div[name="personal-training"] div[name="input-manager"] input, '+
                'div[name="input-display"] input').blur(function(){
                if(verifyAllInputIsNumber()) {
                    var that = this;
                    calcManageAllotTime($(that));
                }
            });

            // 提交按钮
            $('button[name="submit-btn"]').click(function() {

                var uuid = $('input:hidden[name="uuid"]').val();
                var phase = parseInt($('input:hidden[name="phase"]').val());
                var userId = $.cookie("user");

                var decisionDivs = $('.hosp-input-info');
                var decision = decisionDivs.map(function(index, div) {
                    var sales = $(div).find('input[name="prod_value"]').map(function(index, input){
                        return {
                            "prod_name": $(input).attr('pharbers-type'),
                            "prod_value": parseInt($(input).attr('data-value')|| 0)
                        };
                    });
                    var visitHours = $(div).find('input[name="prod_hours"]').map(function(index, input){
                        return {
                            "prod_name": $(input).attr('pharbers-type'),
                            "prod_hours": parseInt($(input).val()|| 0)
                        };
                    });
                    return {
                        "hosp_code": parseInt($(div).find('input[name="hospital-code"]').val()),
                        "hosp_name": $(div).attr("name"),
                        "phase": phase,
                        "budget": parseInt($(div).find('input[name="input-budget"]').val() || 0),
                        "salesmen": $(div).find('select option:selected').val(),
                        "sales": sales.toArray(),
                        "visit_hours": visitHours.toArray()
                    };
                });

                var projectNames = ["能力辅导", "实地协访", "团队例会和团建", "KPI 报告分析", "行政工作", "产品培训"];
                var managementDiv = $('div[name="personal-training"]')
                var management = $(projectNames).map(function(index, name) {
                    var projectCode = parseInt($(managementDiv).find('input[name="'+ name +'"]').eq(0).attr("code"));
                    var apply = $(managementDiv).find('input[name="'+ name +'"]').map(function(index, input){
                        return {
                            "personal": $(input).attr("personal"),
                            "days": parseInt($(input).val() || 0)
                        };
                    });
                    return {
                        "phase": phase,
                        "project_name": name,
                        "project_code": projectCode,
                        "apply": apply.toArray()
                    };
                });

                var userInfo = {
                    "user_id": userId,
                    "uuid": uuid
                };

                var decisionTmp = {
                    "user_id": userId,
                    "uuid": uuid,
                    "phase": phase,
                    "decision": decision.toArray()
                };

                var managerTmp = {
                    "user_id": userId,
                    "uuid": uuid,
                    "phase": phase,
                    "management": management.toArray()
                };


                var decisionJson = JSON.stringify($.extend(decisionTmp, f.parameterPrefixModule.conditions(userInfo)));
                var managementJson = JSON.stringify($.extend(managerTmp, f.parameterPrefixModule.conditions(userInfo)));
                // w.console.info(decisionJson)

                // w.console.info(verifyAllSalesMenIsSelected())
                // w.console.info(verifyAllInputIsNumber())
                // w.console.info(verifyManageTimelg())
                // w.console.info(verifyTimelg())
                // w.console.info(verifyBudgeteq())
                // w.console.info(verifyAllPersonnelTraining())
                // w.console.info(verifyTimeeq())
                // w.console.info(verifyAllHospitalAllot());
                // w.console.info(verifyAllotHositalNotNull()）

                if(verifyAllInputIsNumber() &&
                    verifyAllSalesMenIsSelected() &&
                    verifyAllHospitalAllot() &&
                    verifyAllotHositalNotNull() &&
                    verifyBudgeteq() &&
                    verifyManageTimelg() &&
                    verifyTimelg() &&
                    verifyTimeeq() &&
                    verifyAllPersonnelTraining()) {

                    f.alert.loading(true);
                    f.ajaxModule.baseCall("/decision/proceed", decisionJson, 'POST', function(r){
                        if(r.status === 'ok' && r.result.input_update === 'success') {
                            f.ajaxModule.baseCall("/management/proceed", managementJson, 'POST', function (rr) {
                                if(rr.status === 'ok' && rr.result.input_update === 'success') {
                                    f.ajaxModule.baseCall('/submit/submitdata', managementJson, 'POST', function(rrr){
                                        if(rrr.status === 'ok' && rrr.result.data === 'success') {

                                            setTimeout(function () {
                                                f.alert.loading(false);
                                                // f.alert.alert_success("消息", "模拟成功");
                                                setTimeout(function(){
                                                    w.location = "/report/" + $('input:hidden[name="uuid"]').val() + "/" + $('input:hidden[name="phase"]').val();
                                                }, 1000)
                                            },600)

                                        }
                                    });
                                }
                            });
                        }
                    });

                } else {

                }
            });

            // 显示导出/导入excel区域按钮
            $('div[name = "toggle-import-export"]').click(function(e) {
                $('div[name="area-import-export"]').toggle();
                $(document).one("click", function(){
                    $('div[name="area-import-export"]').hide();
                });
                e.stopPropagation();
            });

            // 导入/导出区域的按钮冒泡阻止
            $('div[name="area-import-export"]').click(function(e) {
                e.stopPropagation();
            });

            // 拖动事件
            $('button[name="btn-right"]').click(function () {
                if($('ul[name="hosp-list"]').position().left == 0) {
                    $('ul[name="hosp-list"]').animate({left:'-64px'},500);
                } else if ($('ul[name="hosp-list"]').position().left == -64){
                    $('ul[name="hosp-list"]').animate({left:'-200px'},1000);
                }
            });
            $('button[name="btn-left"]').click(function () {
                if($('ul[name="hosp-list"]').position().left == -200) {
                    $('ul[name="hosp-list"]').animate({left:'-135px'},500);
                } else if ($('ul[name="hosp-list"]').position().left == -135){
                    $('ul[name="hosp-list"]').animate({left:'0px'},1000);
                }
            })
        }
    });


})(jQuery, window);
