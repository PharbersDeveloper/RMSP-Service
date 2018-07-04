(function($, w){

    const inputs_keyup = function () {
        let inputs = $("input");
        $.each(inputs,function (i, v) {
            $(v).keyup(function () {
                let type = $(this).attr("pharbers-type");
                switch (type){
                    case "能力辅导" :
                        sum_part('[pharbers-sum="coach-all"]', '[pharbers-type="能力辅导"]');
                        sum_all();
                        break;
                    case "实地协访":
                        sum_part('[pharbers-sum="assist-all"]', '[pharbers-type="实地协访"]');
                        sum_all();
                        break;
                    case "团队例会和团建":
                        sum_part('[pharbers-sum="construction-all"]', '[pharbers-type="团队例会和团建"]');
                        sum_all();
                        break;
                    case "KPI 报告分析":
                        sum_part('[pharbers-sum="report-all"]', '[pharbers-type="KPI 报告分析"]');
                        sum_all();
                        break;
                    case "行政工作":
                        sum_part('[pharbers-sum="pr-all"]', '[pharbers-type="行政工作"]');
                        sum_all();
                        break;
                    default:

                }


            })

        })

    };
    const sum_all = function () {
        let share_sum = 0;
        $('[pharbers-share="share"]').map(function (i, e) {
            share_sum += parseInt($(e).text());
        });
        $.each($('[pharbers-sum="sum-all"]'), function (i, e) {
            $(e).text(share_sum);
        });
    };
    const sum_part = function (arrName, attr) {
        let inputs = $('input');
        let pres = $('pre');
        let part_sum = 0;
        inputs.filter(attr).map(function (i , e) {
            part_sum += parseInt($(e).val());
        });

        $.each(pres.filter(arrName), function (i, e) {
            $(e).text(part_sum);
        });
    };
    const init_all = function () {
        sum_part('[pharbers-sum="coach-all"]', '[pharbers-type="能力辅导"]');
        sum_part('[pharbers-sum="assist-all"]', '[pharbers-type="实地协访"]');
        sum_part('[pharbers-sum="construction-all"]', '[pharbers-type="团队例会和团建"]');
        sum_part('[pharbers-sum="report-all"]', '[pharbers-type="KPI 报告分析"]');
        sum_part('[pharbers-sum="pr-all"]', '[pharbers-type="行政工作"]');
        sum_all();
    };
    $(function() {
        {
            init_all();
            inputs_keyup();
        }

        $('#go-submit').click(function(){
            let $inputs = $('input');
            let testNumber = false;
            $.each($inputs.not(':hidden'), function (i, e) {
                if(regexExce(numberzzs, $(e).val())) {
                } else {
                    testNumber = true;
                }
            });
            let sum = 0;
            let coach = [];
            $inputs.filter('[pharbers-type="能力辅导"]').map(function(val, input){
                sum += parseInt($(input).val());
                coach.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let assist = [];
            $inputs.filter('[pharbers-type="实地协访"]').map(function(val, input){
                sum += parseInt($(input).val());
                assist.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let construction = [];
            $inputs.filter('[pharbers-type="团队例会和团建"]').map(function(val, input){
                sum += parseInt($(input).val());
                construction.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let report = [];
            $inputs.filter('[pharbers-type="KPI 报告分析"]').map(function(val, input){
                sum += parseInt($(input).val());
                report.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let pr = [];
            $inputs.filter('[pharbers-type="行政工作"]').map(function(val, input){
                sum += parseInt($(input).val());
                pr.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let product = [];
            $inputs.filter('[pharbers-type="产品培训"]').map(function(val, input){
                product.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });

            let json = {
                "user_id": $.cookie("user"),
                "uuid": $("input:hidden[name='uuid']").val(),
                "phase": parseInt($("input:hidden[name='phase']").val()),
                "management": [
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "能力辅导",
                        "project_code": parseInt("0"),
                        "apply": coach
                    },
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "实地协访",
                        "project_code": parseInt("1"),
                        "apply": assist
                    },
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "团队例会和团建",
                        "project_code": parseInt("2"),
                        "apply": construction
                    },
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "KPI 报告分析",
                        "project_code": parseInt("3"),
                        "apply": report
                    },
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "行政工作",
                        "project_code": parseInt("4"),
                        "apply": pr
                    },
                    {
                        "phase": parseInt($("input:hidden[name='phase']").val()),
                        "project_name": "产品培训",
                        "project_code": parseInt("5"),
                        "apply": product
                    },
                ]
            };
            let user_info = {
                "user_id": $.cookie("user"),
                "uuid": $("input:hidden[name='uuid']").val()
            };

            // console.info(JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))))

            if(sum > 100) {
                f.alert.alert_warn("经理分配时间", "超出预设时间");
            } else if(sum < 0){
                f.alert.alert_warn("经理分配时间", "低于预设时间");
            } else if(testNumber){
                f.alert.alert_error("错误", "输入数值必须为正整数");
            } else {
                // TODO: Ajax
                f.alert.loading();
                f.ajaxModule.baseCall("/management/proceed", JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))), 'POST', function (r) {
                    if(r.status === 'ok' && r.result.input_update === 'success') {
                        f.ajaxModule.baseCall('/submit/submitdata', JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))), 'POST', function(rr){
                            if(rr.status === 'ok' && rr.result.data === 'success') {
                                layer.closeAll('loading');
                                f.alert.alert_success("消息", "模拟成功");
                                w.location = "/report/" + $('input:hidden[name="uuid"]').val() + "/" + $('input:hidden[name="phase"]').val();
                            }
                        });
                    }
                });
            }
        });

    });



})(jQuery, window);
