var resinformation = (function($, w){
    var overflowTableContainer = $(".inside-div");
    var overflowTableContainerEle = overflowTableContainer[0];
    var tableHeade = $(".overflow-table-head");
    var table = $(".overflow-table");
    var tablelen = table.length;
    var oldTableWidth = 0;
    var scrollBarLength = 0;
    var barLines = [];

    var personMaping = [
        {name: "小宋", alias: "salesmen_first"},
        {name: "小兰", alias: "salesmen_second"},
        {name: "小木", alias: "salesmen_third"},
        {name: "小白", alias: "salesmen_fourth"},
        {name: "小青", alias: "salesmen_fifth"}
    ];
    // 判断是哪个有滚动条的表格显示
    function whichTable() {
        try {
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
            }
            scrollBarLength = overflowTableContainerEle.offsetWidth - overflowTableContainerEle.clientWidth;
            overflowTableContainerEle.style.paddingRight = scrollBarLength + "px";
        } catch(err) {
            w.console.info(err)
        }

    }

    // 消除滚动条
    function resetTableWidth() {
        oldTableWidth = 0;
        for (var i = 0; i < tablelen; i++) {
                oldTableWidth = overflowTableContainer[i].clientWidth;
                table[i].style.width = tableHeade[i].clientWidth + "px";
        }
    }

    // 医院、代表、产品信息切换
    var switchHospitalWithProductInfo = function(identify) {
        // download-btn
        var $div = $('div[name="resource-info"]');
        if($div.css("display") === "block") {
            if(identify === "指标任务") {
                $div.find(".indicators-list").show();
                $div.find(".person-list").hide();
                $div.find(".hospital-list").hide();
                $div.find(".product-list").hide();
                $div.find(".report-list").hide();
                $div.find(".download-btn").hide();
            } else if(identify === "团队信息") {
                $div.find(".indicators-list").hide();
                $div.find(".person-list").show();
                $div.find(".hospital-list").hide();
                $div.find(".product-list").hide();
                $div.find(".report-list").hide();
                $div.find(".download-btn").hide();
                $.each(barLines, function(i,v) {
                    v.resize();
                });
            } else if(identify === "医院信息"){
                $div.find(".indicators-list").hide();
                $div.find(".hospital-list").show();
                $div.find(".person-list").hide();
                $div.find(".product-list").hide();
                $div.find(".report-list").hide();
                $.each(barLines, function(i,v) {
                    v.resize();
                });
                // $div.find(".download-btn").show();
            } else if(identify === "产品信息"){
                $div.find(".indicators-list").hide();
                $div.find(".hospital-list").hide();
                $div.find(".person-list").hide();
                $div.find(".product-list").show();
                $div.find(".report-list").hide();
                $div.find(".download-btn").hide();
            } else {
                $div.find(".indicators-list").hide();
                $div.find(".hospital-list").hide();
                $div.find(".person-list").hide();
                $div.find(".product-list").hide();
                $div.find(".report-list").show();
                $div.find(".download-btn").hide();
                whichTable();
                resetTableWidth();
            }
        }
    };

    var personBar = function(identify) {
        var salesmen_skills = JSON.parse($("#salesmen_skills").val());
        var salesmen_knowledge = JSON.parse($("#salesmen_knowledge").val());
        var salesmen_positive = JSON.parse($("#salesmen_positive").val());

        var data = [];
        var phase1_data = [];

        var aliasObject = $(personMaping).filter(function(index, elem) {return elem.name ===  identify}).toArray()[0];
        $.each(salesmen_skills, function(i, v) {
           if (v.general_names === "当期销售技巧(指数)") {
               phase1_data.push(v[""+aliasObject.alias+""]);
           } else {
               data.push(v[""+aliasObject.alias+""]);
           }
        });

        $.each(salesmen_knowledge, function(i, v) {
            if (v.general_names === "当期产品知识(指数)") {
                phase1_data.push(v[""+aliasObject.alias+""]);
            } else {
                data.push(v[""+aliasObject.alias+""]);
            }
        });

        $.each(salesmen_positive, function(i, v) {
            if (v.general_names === "当期工作积极性(指数)") {
                phase1_data.push(v[""+aliasObject.alias+""]);
            } else {
                data.push(v[""+aliasObject.alias+""]);
            }
        });

        var bar = echarts.init($('.person-list div[name="'+ identify +'"]')[0]);
        var option = {
            title: {
                show: true,
                textStyle: {
                    color: '#fff'
                },
                text: '代表能力值'
            },
            grid: {left: '20%'},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#3398DB'
                    }
                }
            },
            label:{
                normal:{
                    show: true,
                    textStyle:{color:'#3398DB'}
                }
            },
            legend: {
                icon: 'circle',
                itemGap: 20,
                right: '10%',
                data: ['2017下半年','2018上半年'],
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: [{
                    type: 'category',
                    data: ['销售技巧','产品知识', '工作积极性'],
                    axisPointer: {type: 'shadow'},
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }],
            yAxis: {
                type: 'value',
                min: 0,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    name: '2017下半年',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color:'#3784DD'
                        }
                    },
                    barWidth: 20,
                    data: data
                },
                {
                    name: '2018上半年',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color:'#30E1BA'
                        }
                    },
                    barWidth: 20,
                    data: phase1_data
                }
            ]
        };
        bar.setOption(option);

        barLines.push(bar);
    };

    var hospital_pro_bar = function(identify) {
        var bar = echarts.init($('.hospital-list div[name="'+ identify +'"]')[0]);

        var phase1 = [];
        var phase2 = [];
        var textarea = JSON.parse($('.hospital-list textarea[name="'+identify+'"]').val());
        phase1.push(textarea[0]);
        phase2.push(textarea[1]);
        var option = {
            title: {
                show: true,
                textStyle: {
                    color: '#fff'
                },
                text: '药品潜力'
            },
            grid: {left: '20%'},
            tooltip: {
                trigger: 'axis',//'{b0}: {c0}<br />{b1}: {c1}'
                formatter: function(parameters){
                    // console.info(parameters);
                    var div = "<div>";
                    $.each(parameters, function(i, v){
                        div += v.marker + "&nbsp;";
                        div += v.name + "&nbsp;&nbsp;";
                        div += f.thousandsModule.formatNum(v.value) + "元";
                        div += "<br/>"
                    });
                    div += "</div>";
                    // console.info(div)
                    return div;
                },
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#3398DB'
                    }
                }
            },
            label:{
                normal:{
                    show: true,
                    formatter: function(elem) {
                        return f.thousandsModule.formatNum(elem.value) + "元"
                    },
                    textStyle:{color:'#3398DB'}
                }
            },
            legend: {
                icon: 'circle',
                itemGap: 20,
                right: '10%',
                data:['2017下半年','2018上半年'],
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: [{
                type: 'category',
                data: ['口服抗生素'],
                axisPointer: {type: 'shadow'},
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }],
            yAxis: {
                type: 'value',
                min: 0,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    name: '2017下半年',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color:'#3784DD'
                        }
                    },
                    // batGap: 80,
                    barWidth: 50,
                    data: phase1
                },
                {
                    name: '2018上半年',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color:'#30E1BA'
                        }
                    },
                    // batGap: 80,
                    barWidth: 50,
                    data: phase2
                }
            ]
        };
        bar.setOption(option);

        barLines.push(bar);
    }

    $(function(){

        init: {
            var person = ["小宋", "小兰", "小木", "小白", "小青"];
            $.each(person, function(i, v){
                personBar(v)
            });

            var hospital = ["人民医院", "军区医院", "中日医院", "铁路医院", "海港医院","第六医院", "小营医院", "西河医院", "光华医院", "大学医院"];
            $.each(hospital, function(i, v){
                hospital_pro_bar(v)
            });
        }
        events: {
            //资源页面 收起按钮
            $('#backup-btn').click(function() {
                $('div[name="message-box"]').show();
                $('div[name="input-box"]').show();
                $('div[name="answer-tab"]').show();
                $('div[name="resource-info"]').hide();
            });

            $('#download-btn').click(function(){
                var jsonObj = JSON.stringify(f.parameterPrefixModule.conditions({
                    uuid: $('input[name="uuid"]').val(),
                    phase: parseInt($('input[name="phase"]').val())
                }));
                f.alert.loading(true);
                f.ajaxModule.baseCall('/hospital/create', jsonObj, 'POST', function(r){
                    if (r.status === 'ok') {
                        f.alert.loading(false);
                        // w.window.open('/download/file/' + r.result.data);
                        w.location.href = '/download/file/' + r.result.data
                    }
                });
            });
            //资源页面 tab切换按钮
            $('div[name="navbar-btn"] button').click(function() {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
                switchHospitalWithProductInfo($(this).text());
            });


        }
    });
    return {
        "barLines": barLines
    }
})(jQuery, window);
