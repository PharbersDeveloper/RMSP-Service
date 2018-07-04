
(function ($, w) {
    $(function(){
        let decision_business = $('#decision-business');
        let decision_management= $('#decision-management');
        let time = 1000 * 2;


        if(decision_business[0] !== undefined) {
            decision_business.idle({
                onIdle: function() {
                    decision_business_fun();
                },
                idle: time,
                startAtIdle: true
            });
        } else if(decision_management[0] !== undefined) {
            decision_management.idle({
                onIdle: function() {
                    decison_management_fun();
                },
                idle: time,
                startAtIdle: true
            });
        } else {
            f.alert.alert_warn('警告', '页面错误！！！');
        }
    });

    const decision_business_fun = function() {
        let $inputs = $('input');
        let $select = $('select');
        let obj = [];

        $("input:hidden[name='input']").map(function(val, input){
            let vv = $(input).val();
            let hospital_name = $inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="budget"]').attr("hospital-name");
            let sales = $.map($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="prod_value"]'), function(sales, i){
                return {
                    "prod_name": $(sales).attr("pharbers-type"),
                    "prod_value": parseFloat($(sales).val())
                }
            });

            let visit = $.map($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="prod_hours"]'), function(sales, i){
                return {
                    "prod_name": $(sales).attr("pharbers-type"),
                    "prod_hours": parseFloat($(sales).val())
                }
            });

            obj.push({
                "hosp_code": parseInt(vv),
                "hosp_name": hospital_name,
                "phase": parseInt($("input:hidden[name='phase']").val()),
                "budget": parseFloat($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="budget"]').val()),
                "sales": sales,
                "salesmen": $select.filter('[hospital-code="'+ vv +'"]').filter('[name="salesmen"]').val(),
                "visit_hours": visit
            })
        });

        let uuid = $("input:hidden[name='uuid']").val();
        let json = {
            "user_id": $.cookie("user"),
            "uuid": uuid,
            "phase": parseInt($("input:hidden[name='phase']").val()),
            "decision": obj
        };
        let user_info = {
            "user_id": $.cookie("user"),
            "uuid": uuid
        };

        f.ajaxModule.baseCall("/decision/proceed", JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))), "POST", function(r){
            // w.location = "/management/" + $('input:hidden[name="uuid"]').val() + "/" + $('input:hidden[name="phase"]').val();
        });
    }

    const decison_management_fun = function() {
        let $inputs = $('input');
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

        f.ajaxModule.baseCall("/management/proceed", JSON.stringify($.extend(json, f.parameterPrefixModule.conditions(user_info))), 'POST', function (r) {
        });
    }
})(jQuery, window);