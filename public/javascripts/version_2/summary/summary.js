// var overflowTableContainer = document.getElementsByClassName("inside-div");


(function($,w){
    var myChart = echarts.init(document.getElementById("container"));

    var option = {
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator:
                [
                    {text: '报表分析与决策', max: 5},
                    {text: '市场洞察', max: 5},
                    {text: '目标分级', max: 5},
                    {text: '公司战略执行力', max: 5},
                    {text: '屏幕', max: 5},
                    {text: '系统', max: 5},
                    {text: '性能', max: 5},
                    {text: '屏幕', max: 5},
                    {text: '屏幕', max: 5}
                ],
            center: ['50%','45%'],
            radius: ['50%','20%']
        },
        series: [
            {
                name: "能力",
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: [1,1,1,1,1,1,1,1,1]
                    }
                ]
            }
        ]
    };
    myChart.setOption(option, true);


    var line_chart = echarts.init(document.getElementById("con"));
    option = {
        xAxis: {
            type: 'category',
            data: ['报表分析与决策', '公司战略执行力', '市场洞察力', '目标分级', '销售计划部署', '资源分配与优化', '领导力','111','222'],
            axisLine: {
                lineStyle: {
                    color: '#F9F9F9' //坐标轴线颜色
                }
            },
            axisLabel: {
                interval:0,
                // rotate:-10
            },
            splitLine:{show: true},
            position:"top",
            nameTextStyle: {
                color:"red"
            }
        },
        yAxis: {
            type: 'category',
            data: ['D', 'C', 'B', 'A', 'S'],
            axisLine: {
                lineStyle: {
                    color: '#F9F9F9' //坐标轴线颜色
                }
            },
            axisLabel: {
                interval:0,
                // rotate:-10
            },
            splitLine:{show: true},
        },
        series: [{
            data: [
                [0,'B'],
                [1,'C'],
                [2,'C'],
                [3,'B'],
                [4,'C'],
                [5,'A'],
                [6,'C'],
                [7,'B'],
                [8,'B'],
                // 'S', 'A', 'B', 'C', 'D','A','B'
            ],
            // symbolSize: symbolSize,
            type: 'line',
            color:['#50E3C2']
        }]
    };

    line_chart.setOption(option, true);

    // console.info($('#sales-ratio').text())

    $(function(){
        init: {
            var condition = f.parameterPrefixModule.conditions(
                {
                    "uuid": $.cookie("uuid"),
                    "phase_key": "final"
                });
            var c = JSON.stringify(condition);

            f.ajaxModule.baseCall("/summary/query", c, "POST", function(rd) {
                if ( rd.status === 'ok') {
                    $('#total-sales').text(f.thousandsModule.formatNum(rd.result.data.total_sales.total));
                    $('#sales-ratio').text(parseFloat(f.thousandsModule.formatNum(rd.result.data.total_sales.uplift_ratio)).toFixed(2)+"%");
                    if(rd.result.data.total_sales.uplift_ratio < 0) {
                        $('#sales-ratio').css("color","red")
                    } else {
                        $('#sales-ratio').css("color","#60b3ad")
                    };

                    $('#team-ability').text(f.thousandsModule.formatNum(rd.result.data.team_ability.team_ability));
                    $('#ability-ratio').text(parseFloat(f.thousandsModule.formatNum(rd.result.data.team_ability.uplift_ratio)).toFixed(2)+"%");
                    if(rd.result.data.team_ability.uplift_ratio < 0) {
                        $('#ability-ratio').css("color","red")
                    } else {
                        $('#ability-ratio-i').css("color","#60b3ad")
                    };

                    $.each(rd.result.data.team_achievement, function(i, v){
                        $('#team-achievement').append('<li>'+v.product_name+'</li>');
                        $('#achievement-radio').append('<li>'+parseFloat(v.achievement_ratio).toFixed(2)+"%"+'</li>');

                    });
                    $.each(rd.result.data.market_share, function (i, v) {
                        $('#product-name').append('<li>'+v.product_name+'</li>');
                        $('#market-share').append('<li>'+parseFloat(v.market_share).toFixed(2)+"%"+'</li>');
                        // $('#uplift-ratio').append('<li>'+parseFloat(v.uplift_ratio).toFixed(2)+"%"+'</li>');
                        if(v.uplift_ratio < 0) {
                            $('#uplift-ratio').append('<li style="color:red">'+parseFloat(v.uplift_ratio).toFixed(2)+"%"+'</li>');
                        } else {
                            $('#uplift-ratio').append('<li style="color:#60B3AD">'+parseFloat(v.uplift_ratio).toFixed(2)+"%"+'</li>');
                        }
                    });
                    $('#overall_score').attr("src",'/assets/images/version_2/'+ rd.result.data.overall_score + ".png");
                    console.info()
                    if(rd.result.data.overall_score == "bronze") {
                        $('#logo-name').text("英勇青铜");
                    } else if(rd.result.data.overall_score == "gold") {
                        $('#logo-name').text("资深黄金");
                    } else if(rd.result.data.overall_score == "silver") {
                        $('#logo-name').text("精英白银");
                    } else{
                        console.error("Error!");
                    }

                    var data = [];
                    var value = [];
                    var indicator = [];
                    var line = [];
                    var x_line = [];
                    var radar_img = [];
                    $.each(rd.result.data.radar_map, function(i, v) {
                        var $div = $('div [description='+ v.name +']');
                        var grade = '/assets/images/version_2/' + v.comments.tips + ".png";
                        var title = '/assets/images/version_2/' + v.name + "-" + v.comments.tips + ".png";
                        var radar = '/assets/images/version_2/d'+ v.comments.tips + ".png";
                        $('#radar-img').find('.radar-img1').attr("src",radar_img[0]);
                        $('#radar-img').find('.radar-img2').attr("src",radar_img[1]);
                        $('#radar-img').find('.radar-img3').attr("src",radar_img[2]);
                        $('#radar-img').find('.radar-img4').attr("src",radar_img[3]);
                        $('#radar-img').find('.radar-img5').attr("src",radar_img[4]);
                        $('#radar-img').find('.radar-img6').attr("src",radar_img[5]);
                        $('#radar-img').find('.radar-img7').attr("src",radar_img[6]);
                        $('#radar-img').find('.radar-img8').attr("src",radar_img[7]);
                        $('#radar-img').find('.radar-img9').attr("src",radar_img[radar_img.length-1]);
                        radar_img.push([radar]);
                        // // $('#radar-img').find('img').attr("src",radar);
                        // // console.info($('#radar-img').find('img'))
                        // console.info(radar_img.length-1)

                        $div.find('img[name="grade"]').attr('src', grade);
                        $div.find('p[name="explain"]').text(v.comments.describe);
                        if (v.comments.score > 2 ) {
                            $div.find('div[name="title"]').append('<img src="' + title + '" alt="">');
                            $('#outline').append('<div class="img"><img src="' + title + '" alt=""></div>')
                        }
                        indicator.push({
                           text: v.name,
                           max: 5
                        });
                        value.push(v.comments.score);

                        $.each(v.advice, function(i,v) {
                            if(v.code === 1) {
                                $('#lifting-direction').css("display","block");
                                $('#promote').append('<li>' + v.describe + '</li>');
                            } else if (v.code === 2) {
                                $('#potential-risk').css("display","block");
                                $('#risk').append('<li>' + v.describe + '</li>')
                            } else if (v.code === 3) {
                                $('#grow-potential').css("display","block");
                                $('#grow').append('<li>' + v.describe + '</li>')
                            } else {}
                        });
                        x_line.push([v.name]);
                        line.push([v.name,v.comments.tips])
                    });

                    data.push({"value": value});
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis'
                        },
                        radar: {
                            indicator: indicator,
                            center: ['50%','45%'],
                            radius: '70%',
                            name: {
                                textStyle: {
                                    fontSize: 10,
                                    color: 'rgb(236, 236, 236)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: [
                                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            "offset": 0,
                                            "color": '#2496dc'

                                        }, {
                                            "offset": 1,
                                            "color": '#FE0059'
                                        }]),

                                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            "offset": 0,
                                            "color": '#FE601B'

                                        }, {
                                            "offset": 1,
                                            "color": '#FE0059'
                                        }]),

                                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            "offset": 0,
                                            "color": '#FE601B'

                                        }, {
                                            "offset": 1,
                                            "color": '#00E8F8'
                                        }])

                                    ]
                                    // color: [
                                    //     'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                                    //     'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                                    //     'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                                    // ].reverse()
                                }
                            },
                            splitArea: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(238, 197, 102, 0.5)'
                                }
                            }
                        },
                        series: [
                            {
                                type: 'radar',
                                name: "能力",
                                tooltip: {
                                    trigger: 'item'
                                },
                                itemStyle: {
                                    normal: {
                                        areaStyle: {type: 'default'},
                                        color: '#5f968f',
                                        borderColor: '#5ac3bd'
                                        // shadowColor:'rgba(0,0,0,0.5)'
                                    }
                                },
                                data: data
                            }
                        ]
                    }, true);

                    // console.info(line)
                    line_chart.setOption({
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            data: x_line,
                            axisLine: {
                                lineStyle: {
                                    color: '#F9F9F9', //坐标轴线颜色
                                },
                                symbolSize:'symbolSize',
                            },
                            axisLabel: {
                                interval:0,
                                textStyle: {
                                    color: '',   //x轴上的字体颜色
                                    fontSize:'16'    // x轴字体大小
                                },
                                // formatter: function (value) {
                                //     return value;
                                // },
                                // rich: {
                                //     'S': {
                                //         backgroundColor: 'red',
                                //         padding: [1, 1, 1, 1],
                                //         margin: [],
                                //     },
                                //     'A': {
                                //         backgroundColor: 'green',
                                //         padding: [5, 32, 5, 32],
                                //         margin: []
                                //     },
                                //     'B': {
                                //         backgroundColor: 'yellow',
                                //         padding: [5, 32, 5, 32],
                                //         margin: []
                                //     }
                                // }

                                // rotate:-10
                            }, //坐标轴文字是否显示完全
                            splitLine:{
                                show: true,
                                color:"#F9F9F9",
                            },
                            position:"top",
                            nameTextStyle: {
                                color:"red"
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: ['D', 'C', 'B', 'A', 'S'],
                            axisLine: {
                                lineStyle: {
                                    color: '#F9F9F9' //坐标轴线颜色
                                }
                            },
                            axisLabel: {
                                interval:0,
                                color: 'white',
                                backgroundColor: '#509c91',
                                padding: [58, 17, 58, 17]
                            },
                            splitLine:{show: true},
                        },
                        grid:{
                            x:50,
                            y:100,
                            x2:5,
                            y2:20,
                            borderWidth:1
                        },
                        series: [{
                            data: line,
                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        width:4,//折线宽度
                                    }
                                }
                            },
                            symbolSize:15,
                            type: 'line',
                            color:['#50E3C2']
                        }]
                    }, true);

                } else {
                    console.error("Error")
                }
            });

        }

        events: {
            //导出Excel
            // $('#exportExcel').click(function(){
            //
            //     f.alert.loading(true);
            //     setTimeout(function(){
            //         f.alert.loading(false);
            //         layer.alert('已下载');
            //     },1000)
            //
            //
            // });
            // // 显示导出/导入excel区域按钮
            // $('div[name = "toggle-export"]').click(function(e) {
            //     $('div[name="area-export"]').toggle();
            //     $(document).one("click", function(){
            //         $('div[name="area-export"]').hide();
            //     });
            //     e.stopPropagation();
            // });
            //
            // // 导入/导出区域的按钮冒泡阻止
            // $('div[name="area-export"]').click(function(e) {
            //     e.stopPropagation();
            // });
            //
            // $('button[name="go-phrase"]').click(function(){
            //     // w.location.href = "/home/" + $('input[name="uuid"]').val() + "/2"
            //     w.location.href = "/transition/" + $('input[name="uuid"]').val() + "/"+ $('input[name="phrase"]').val()
            // });

        }
    });

})(jQuery, window);