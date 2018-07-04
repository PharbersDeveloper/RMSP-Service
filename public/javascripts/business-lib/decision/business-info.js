(function ($, w) {
    var f = new Facade();
    var $content = $('#sum_promotion_budget-cycle1');
    var $content2 = $('#sum_promotion_budget-cycle2');
    var $business_tab_li = $('#business_tab li');

    $(function () {
        $business_tab_li.click(function () {
            if ($(this).find("a").attr("pharbers-status") === "false") {
                cycle_tab($(this).find("a").text());
            }
        });

        disabled_button();
        reload_cycle_status();

    });

    //当做完一次计算操作时，需要禁用一些操作与展示一些历史数据
    function reload_cycle_status() {

        if (cycle1_status) {
            $business_tab_li.eq(1).find('a').click();
        } else {
            $business_tab_li.eq(0).find('a').click();
        }

        $('#p1_go_decision:not(".disabled")').click(function () {
            click_next_button_cycle1();
        });
        $('#p2_go_decision:not(".disabled")').click(function () {
            click_next_button_cycle2();
        });
    }

    function disabled_button() {
        var $p1_btn = $('#p1_go_decision');
        var $p2_btn = $('#p2_go_decision');
        if (cycle1_status && $p1_btn.attr("class").indexOf('disabled') < 0) {
            $p1_btn.attr('class', $p1_btn.attr('class') + 'disabled');
        } else if (cycle1_status) {
            $content.find('input').attr("disabled", true);
        }
        if (cycle2_status && $p2_btn.attr("class").indexOf('disabled') < 0) {
            $p2_btn.attr('class', $p2_btn.attr('class') + 'disabled');
        } else if (cycle2_status) {
            $content2.find('input').attr("disabled", true);
        }
    }

    function cycle_tab(cycle) {
        var json = JSON.stringify(f.parameterPrefixModule.conditions({"cycle": cycle}));
        switch (cycle) {
            case "周期1":
                load_business_cycle1_info(json);
                break;
            case "周期2":
                load_business_cycle2_info(json);
                break;
        }
    }

    function load_business_cycle1_info(json) {
        f.ajaxModule.baseCall("/business_decision", json, "POST", function (r) {
            cycle1_append_html(r);
            w.business_event.bind_input_change($content);
            disabled_button()
        }, function (e) {
            console.info(e)
        })
    }

    function load_business_cycle2_info(json) {
        f.ajaxModule.baseCall("/business_decision", json, "POST", function (r) {
            cycle2_aapend_html(r);
            w.business_event.bind_input_change($content2);
        }, function (e) {
            console.info(e)
        })
    }

    var click_next_button_cycle1 = function () {
        var $inputs = $content.find('div input,pre');
        var $select = $content.find('div select');
        return_cycle1_json($inputs, $select);
    };

    var return_cycle1_json = function (inputsObj, selectsObj) {
        var arr = new Array();
        var arranged_time_wrong_array = new Array();
        var arranged_promotional_budget_array = new Array();
        var arranged_person_hospital_array = new Array();
        var persons = $('select[pharbers-type="p1_sr_hosp1"]').find("option");
        var person_arr = new Array();
        $.each(persons, function (ele) {
            person_arr.push(ele);
        });
        var person_num = person_arr.length - 1;
        var json = {"phase": [1]};

        $.each(inputsObj, function (i, v) {
            var input = $(v);
            var key = input.attr("pharbers-type");
            if (regexTest(arranged_time, key)) {
                if (parseFloat(input.text()) > 100 || parseFloat(input.text()) <= 0)
                    arranged_time_wrong_array.push(key);
            } else if (regexTest(arranged_promotional_budget, key)) {
                if (parseFloat(input.text()) > 100 || parseFloat(input.text()) <= 0)
                    arranged_promotional_budget_array.push(key);
            } else {
            }
            var rgxArr = Array(pro_budget_hosp, hosp_sales_target, hosp_worktime);
            if (input.val() === "0")  {
            } else if (regexTestSome(rgxArr, key)) {
                arr.push(input.val() + "_" + key);
            } else {
            }
            json[key] = [input.val() === "" ? input.text().replace(",", "") : input.val()];
        });

        var harr = new Array();
        $.each(arr, function (i, v) {
            var realHos = v + "";
            var item_arr = realHos.split("_");
            for (var j in item_arr) {
                if (regexTest(hospR, item_arr[j])) {
                    harr.push(item_arr[j]);
                }
            }

        });
        var h_err = new Array();
        var herrs = new Array();
        $.each(harr, function (i, v) {
            var key = 'p1_sr_' + v;
            var select = $('select[pharbers-type=\"'+key+'\"]');
            if (select.val() == ""){
                h_err.push(key);
                herrs.push(v);
            }

        });
        var herr_dis = herrs.distinct();
        var herr_tip = hospital_match(herr_dis);
        $.each(selectsObj, function (i, v) {
            var select = $(v);
            var key = select.attr("pharbers-type");
            if (regexTest(arranged_person_hospital, key)) {
                if (select.val() != "") {
                    arranged_person_hospital_array.push(select.val())
                }
            }
            json[key] = [select.val()];
        });
        var arranged_person_hos_array = arranged_person_hospital_array.distinct();

        next_save_cycle1_business_decision_json_data = json;

        if (arranged_time_wrong_array.length != 0) {
            f.alert.alert_error("分配时间", "分配时间错误！请再次检查。")
        } else if (arranged_promotional_budget_array.length != 0) {
            f.alert.alert_error("分配推广预算", "分配的推广预算错误！请再次检查。")
        } else if (herr_tip.length != 0) {
            var strs = $.each(herr_tip, function (i, v) {
                return " " + v
            });
            f.alert.alert_error("分配任务", strs + "未分派业务代表！请再次检查。")
        } else {
            switch_left_page('management-decision');
        }
    };
    var click_next_button_cycle2 = function () {
        var $inputs = $content2.find('div input,pre');
        var $select = $content2.find('div select');
        return_cycle2_json($inputs, $select);
    };

    var return_cycle2_json = function (inputsObj, selectsObj) {
        var arr = new Array();
        var arranged_time_wrong_array = new Array();
        var arranged_promotional_budget_array = new Array();
        var json = {"phase": [2]};
        $.each(inputsObj, function (i, v) {
            var input = $(v);
            var key = input.attr("pharbers-type");
            if (regexTest(arranged_time, key)) {
                console.log(parseFloat(input.text()));
                if (parseFloat(input.text()) > 100 || parseFloat(input.text()) <= 0)
                    arranged_time_wrong_array.push(key);
            } else if (regexTest(arranged_promotional_budget, key)) {
                if (parseFloat(input.text()) > 100 || parseFloat(input.text()) <= 0)
                    arranged_promotional_budget_array.push(key);
            } else {
            }
            var rgxArr = Array(pro_budget_hosp, hosp_sales_target, hosp_worktime);
            if (input.val() === "0") {
            } else if (regexTestSome(rgxArr, key)) {
                arr.push(input.val() + "_" + key);
            } else {
            }
            json[key] = [input.val() === "" ? input.text().replace(",", "") : input.val()];
        });

        var harr = new Array();
        $.each(arr, function (i, v) {
            var realHos = v + "";
            var item_arr = realHos.split("_");
            for (var j in item_arr) {
                if (regexTest(hospR, item_arr[j])) {
                    harr.push(item_arr[j]);
                }
            }

        });
        var h_err = new Array();
        var herrs = new Array();
        $.each(harr, function (i, v) {
            var key = 'p2_sr_' + v;
            var select = $('select[pharbers-type=\"'+key+'\"]');
            if (select.val() === ""){
                console.log(v);
                h_err.push(key);
                herrs.push(v);
            }

        });
        var herr_dis = herrs.distinct();
        var herr_tip = hospital_match(herr_dis);

        $.each(selectsObj, function (i, v) {
            var select = $(v);
            var key = select.attr("pharbers-type");
            json[key] = [select.val()];
        });

        next_save_cycle2_business_decision_json_data = json;
        if (arranged_time_wrong_array.length !== 0) {
            f.alert.alert_error("分配时间", "分配时间错误！请再次检查。")
        } else if (arranged_promotional_budget_array.length !== 0) {
            f.alert.alert_error("分配推广预算", "分配的推广预算错误！请再次检查。")
        } else if (herr_tip.length !== 0) {
        // if (herr_tip.length !== 0) {
            var strs = $.each(herr_tip, function (i, v) {
                return " " + v
            });
            f.alert.alert_error("分配任务", strs + "未分派业务代表！请再次检查。")
        } else {
            switch_left_page('management-decision');
        }
    };


    var switch_left_page = function (page) {
        disabled_button();
        var $li = $('ul[class="treeview-menu"] li a[pharbers-filter=' + page + ']');
        $li.click();
    };

    var cycle1_append_html = function (r) {
        $content.empty();
        if (r.status === 'ok') {
            $content.append(r.result.data.reValSumPrompBudgetHtml);
            $content.append(r.result.data.reValHospitalHtml);
        } else {
            $content.html('<h1 style="color: red">Error.</h1>');
        }
        var $hospitals = $content.find('.hospital-num div:gt(0)');
        var $sum = $content.find('pre[pharbers-type="p1_total_promotional_budget"]');
        $sum.text(f.thousandsModule.formatNum($sum.text().split(".")[0]));
        $.each($hospitals, function (i, v) {
            var $hnum = $(v).find('.noplaceholder').eq(0);
            var num = f.thousandsModule.formatNum($hnum.text().split(".")[0]);
            $hnum.text(num);
        });
        $business_tab_li.eq(0).find("a").attr("pharbers-status", true);

    };

    var cycle2_aapend_html = function (r) {
        if (cycle1_status)
            $('div').find('.cycle-style-controller').css('display', 'block');

        $content2.empty();
        if (r.status === 'ok') {
            $content2.append(r.result.data.reValSumPrompBudgetHtml);
            $content2.append(r.result.data.reValHospitalHtml);
        } else {
            $content2.html('<h1 style="color: red">Error.</h1>');
        }
        var $hospitals = $content2.find('.hospital-num div:gt(0)');
        var $sum = $content2.find('pre[pharbers-type="p2_total_promotional_budget"]');
        $sum.text(f.thousandsModule.formatNum($sum.text().split(".")[0]));

        $.each($hospitals, function (i, v) {
            var $hnum = $(v).find('.noplaceholder').eq(0);
            var num = f.thousandsModule.formatNum($hnum.text().split(".")[0]);
            $hnum.text(num);
        });
        $business_tab_li.eq(1).find("a").attr("pharbers-status", true);

    };
    var hospital_match = function (herrs) {
        var arr = new Array();
        $.each(herrs, function (i, v) {
            console.log(v);
            if (v === "hosp1") arr.push("第一家医院");
            else if (v === "hosp2") arr.push("第二家医院");
            else if (v === "hosp3") arr.push("第三家医院");
            else if (v === "hosp4") arr.push("第四家医院");
            else if (v === "hosp5") arr.push("第五家医院");
            else if (v === "hosp6") arr.push("第六家医院");
            else if (v === "hosp7") arr.push("第七家医院");
            else if (v === "hosp8") arr.push("第八家医院");
            else if (v === "hosp9") arr.push("第九家医院");
            else if (v ==="hosp10") arr.push("第十家医院");
            else {
            }
        });
        return arr;
    }

})(jQuery, window);