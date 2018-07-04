(function($, w){
    var f = new Facade();
    var $content = $('#management-cycle1');
    var $content2 = $('#management-cycle2');
    var $management_tab_li = $('#management_tab li');

    $(function () {
        // console.info(cycle1_status)

        disabled_button();
        reload_cycle_status();

    });

    function reload_cycle_status() {

        if(cycle1_status) {
            $('div').find('.cycle-style-controller').css('display', 'block');
            $management_tab_li.eq(1).find('a').click();
        }

        $('#p1_go_decision:not(.disabled)').click(function() {
            click_submit_button_cycle1();
        });

        $('#p2_go_decision:not(.disabled)').click(function() {
            click_submit_button_cycle2();
        });
    }

    function disabled_button() {
        var $p1_btn = $('#p1_go_decision');
        var $p2_btn = $('#p2_go_decision');
        if(cycle1_status && $p1_btn.attr("class").indexOf('disabled') < 0) {
            $p1_btn.attr('class', $p1_btn.attr('class')+'disabled');
            $content.find('input').attr("disabled", true);
        }

        if(cycle2_status && $p2_btn.attr("class").indexOf('disabled') < 0) {
            $p2_btn.attr('class', $p2_btn.attr('class')+'disabled')
            $content2.find('input').attr("disabled", true);
        }
    }


    var click_submit_button_cycle1 = function() {
        var $inputs = $content.find('div input,pre');
        var rjv = return_cycle1_json($inputs);
        var obj = JSON.parse(rjv);
        if(parseFloat(obj.p1_arranged_time_of_flm) <=0 ||parseFloat(obj.p1_arranged_time_of_flm) > 100){
            f.alert.alert_error("时间分配","时间分配错误！请重新检查时间分配")
        }else {
            layer.load();
            f.ajaxModule.baseCall("submit/submitdata", rjv, "POST", function(r){
                if(r.status === 'ok') {
                    f.cookieModule.setCookie('reportname1', r.result.data.reportname);
                    cycle1_status = true;
                    var $report = $('#left-page li a[pharbers-filter="report"]');
                    $report.click();
                    layer.closeAll('loading');
                } else {
                    console.log(r);
                    f.cookieModule.setCookie('reportname1', '');
                    cycle1_status = false;
                    f.alert.alert_error('提交', '出现未知错误！');
                    layer.closeAll('loading');
                }
            });
        }


    };

    var click_submit_button_cycle2 = function() {
        var $inputs = $content2.find('div input,pre');
        var rjv = return_cycle2_json($inputs);
        var obj = JSON.parse(rjv);
        if(parseFloat(obj.p2_arranged_time_of_flm) <=0 ||parseFloat(obj.p2_arranged_time_of_flm) > 100){
            f.alert.alert_error("时间分配","时间分配错误！请重新检查时间分配")
        }else {
            layer.load();
            f.ajaxModule.baseCall("submit/submitdata", rjv, "POST", function(r){
                if(r.status === 'ok') {
                    f.cookieModule.setCookie('reportname2', r.result.data.reportname);
                    cycle2_status = true;
                    var $report = $('#left-page li a[pharbers-filter="report"]');
                    $report.click();
                    layer.closeAll('loading');
                } else {
                    f.cookieModule.setCookie('reportname2', '');
                    cycle2_status = true;
                    f.alert.alert_error('提交', '出现未知错误！');
                    layer.closeAll('loading');
                }
            });
        }
    };

    var return_cycle1_json = function(inputsObj) {
        var temp =  next_save_cycle1_business_decision_json_data;
        var json = {"user_name": [$.cookie("user")]};
        $.each(inputsObj, function(i, v) {
            var input = $(v);
            var key = input.attr("pharbers-type");
            json[key] = [input.val() === "" ? input.text().replace(",", "") : input.val()];
        });
        return JSON.stringify($.extend(temp, json));
    };

    var return_cycle2_json = function(inputsObj) {
        var temp =  next_save_cycle2_business_decision_json_data;
        console.log(next_save_cycle2_business_decision_json_data.phase)
        // if(next_save_cycle2_business_decision_json_data.phase === undefined){
        //     next_save_cycle2_business_decision_json_data["phase"] =["2"]
        // }
        var json = {"user_name": [$.cookie("user")]};
        $.each(inputsObj, function(i, v) {
            var input = $(v);
            var key = input.attr("pharbers-type");
            json[key] = [input.val() === "" ? input.text().replace(",", "") : input.val()];
        });
        return JSON.stringify($.extend(temp, json));
    };

    setTimeout(function(){
        var active = $management_tab_li.filter('[class="active"]');
        if (active.index() === 0) {
            console.log("gom");
            var history = $.cookie("history");
            var c1_m = $.cookie("c1_manage");
            if(history === "0"&&c1_m === "0"){
                $.cookie("c1_manage", "1")
            }else {
                $.cookie("c1_manage", "1");
                setHistory(1, "#management-cycle1");
                setHistory(2, "#management-cycle2");
            }
            w.management_event.bind_input_change($content);
        } else if (active.index() === 1) {
            var history = $.cookie("history");
            var c2_m = $.cookie("c2_manage")
            if(history === "0" && c2_m==="0"){
                $.cookie("c2_manage", "1");
                setHistory(1, "#management-cycle1");
            }else {
                $.cookie("c2_manage", "1");
                setHistory(1, "#management-cycle1");
                setHistory(2, "#management-cycle2");
            }
            w.management_event.bind_input_change($content2);
        } else {
            console.warn("find a lot of 'li'")
        }
    }, 300);


    var setHistory = function (cyc, id) {
        var user = $.cookie("user");
        var json = {
            "phase" : [cyc+"_manage"],
            "user" : user
        };
        // console.log(json);
        f.ajaxModule.baseCall("/fetch/input", JSON.stringify(json), "POST", function (r) {
            if(r.status === 'ok'){
                var content = $(id);
                var res = r.result.input;
                var inputs = content.find('input');
                var pres = content.find('pre');
                $.each(inputs, function(i ,v){
                    var key = $(v).attr("pharbers-type");
                    var r = res[key];
                    if(r === undefined){
                        console.log(r)
                    }else {
                        $(v).val(r);
                    }

                });
                $.each(pres, function(i ,v){
                    var key = $(v).attr("pharbers-type");
                    var r = res[key];
                    // console.log(key +":"+ res[key]);
                    if(r === undefined){
                        console.log(r)
                    }else {
                        $(v).text(r);
                    }

                });
            }
        })
    };
})(jQuery, window);