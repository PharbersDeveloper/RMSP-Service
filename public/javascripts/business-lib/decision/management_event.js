var management_event = (function ($, w) {
    var $content = $('#management-cycle1');
    var $management_tab_li = $('#management_tab li');
    $(function(){
        $('#go-submit').click(function(){
            let $inputs = $('input');

            let coach = [];
            $inputs.filter('[pharbers-type="能力辅导"]').map(function(val, input){
                coach.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let assist = [];
            $inputs.filter('[pharbers-type="实地协访"]').map(function(val, input){
                assist.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let construction = [];
            $inputs.filter('[pharbers-type="团队例会和团建"]').map(function(val, input){
                construction.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let report = [];
            $inputs.filter('[pharbers-type="KPI 报告分析"]').map(function(val, input){
                report.push({
                    "personal": $(input).attr("name"),
                    "days": parseInt($(input).val())
                });
            });
            let pr = [];
            $inputs.filter('[pharbers-type="行政工作"]').map(function(val, input){
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


            //TODO: Ajax
            f.ajaxModule.baseCall("/management/proceed", JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))), 'POST', function (r) {
                console.info(r)
            })
        })
    });



    function bind_input_change(region) {
        var $inputs = (region || $content).find('input');
        var $pres = (region || $content).find('pre');
        function bind_input(obj, key) {
            var lst = obj[key];
            $.each(lst.inputs, function(i, v) {
                var input_attr = '[pharbers-type="' + v + '"]';
                var $input = $inputs.filter(input_attr);
                $input.keyup(function() {
                    var num = 0;
                    $.each(lst.inputs, function(i, v2) {
                        var input_attr = '[pharbers-type="' + v2 + '"]';
                        var $input = $inputs.filter(input_attr);
                        if ($input.val() === "") $input.val(0);
                        num += parseInt($input.val());
                    });
                    $.each(lst.oputs, function(i, v2){
                        var pre_attr = '[pharbers-type="'+ v2 +'"]';
                        var $pre = $pres.filter(pre_attr);
                        $pre.empty().text(num);
                    });
                    sum(obj);
                });
            });
        }

        function sum(obj) {
            var lst = obj['input_sum'];
            var time_allot = obj['time_allot'];
            var num = 0;
            $.each(lst, function(i, v){
                var pre_attr = '[pharbers-type="'+ v +'"]';
                var $pre = $pres.filter(pre_attr);
                num += parseInt($pre.text());
            });
            $.each(time_allot, function(i, v){
                var pre_attr = '[pharbers-type="'+ v +'"]';
                var $pre = $pres.filter(pre_attr);
                $pre.empty().text(num);
            });
        }

        var active = $management_tab_li.filter('[class="active"]');
        if (active.index() === 0) {
            bind_input(cycle_1_inputs, 'ability_to_coach');
            bind_input(cycle_1_inputs, 'field_association_to_visit');
            bind_input(cycle_1_inputs, 'party_building');
            bind_input(cycle_1_inputs, 'kpi_report');
            bind_input(cycle_1_inputs, 'administrative');

        } else if (active.index() === 1) {
            bind_input(cycle_2_inputs, 'ability_to_coach');
            bind_input(cycle_2_inputs, 'field_association_to_visit');
            bind_input(cycle_2_inputs, 'party_building');
            bind_input(cycle_2_inputs, 'kpi_report');
            bind_input(cycle_2_inputs, 'administrative');
        } else {
            console.warn("find a lot of 'li'")
        }

    };

    return {
        "bind_input_change" : bind_input_change
    }
})(jQuery, window);