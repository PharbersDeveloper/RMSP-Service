/**
 * Created by yym on 12/28/17.
 */
var store_info = (function ($, w) {
    var f = new Facade();
    var webPage = function () {
        if(w.rsmp_page === "business_decision"){
            // console.log($("a[aria-controls='tab-2688-1']").attr('aria-expanded')!=="false");
            if ($('#p1_go_decision').attr('class').indexOf('disabled') < 0 && $("a[aria-controls='tab-2688-1']").attr('aria-expanded')!=="false") {
                return ['#sum_promotion_budget-cycle1', 1 , 'decision'];
            } else if ($('#p1_go_decision').attr('class').indexOf('disabled') > 0&&$('#p2_go_decision').attr('class').indexOf('disabled') < 0 && $("a[aria-controls='tab-2688-1']").attr('aria-expanded')!== "true") {
                return ['#sum_promotion_budget-cycle2', 2 , 'decision'];
            }else {
                return ["", 0 , 'unknown'];
            }

        }else if(w.rsmp_page ==="management_decision"){
            // console.log($('#p1_go_decision').attr('class').indexOf('action-button') );
            // console.log($("a[aria-controls='tab-2611-2']").attr('aria-expanded'));
            if ($('#p1_go_decision').attr('class').indexOf('action-button') > 0 && $("a[aria-controls='tab-2611-1']").attr('aria-expanded')!=="false") {
                return ['#management-cycle1', 1 , 'manage'];
            } else if (cycle1_status &&$('#p2_go_decision').attr('class').indexOf('action-button') > 0   && ($("a[aria-controls='tab-2611-1']").attr('aria-expanded')!== "true")) {
                return ['#management-cycle2', 2, 'manage'];
            } else {
                return ["", 0,'unknown'];
            }
        }else {
            return ["", 0 , 'unknown'];
        }

    };

    var decision_json = function (content) {
        var json = {};
        var inputs = $(content).find('input');
        var pres = $(content).find('pre');
        var selects = $(content).find('select');
        $.each(inputs, function (i, v) {
            var input = $(v);
            var key = input.attr("pharbers-type");
            json[key] = [input.val()];
        });
        $.each(pres, function (i, v) {
            var pre = $(v);
            var key = pre.attr("pharbers-type");
            if(key ==="p1_potential_sales_hosp6_2"){
                json["unknownError"] = [pre.text()];
            }else {
                json[key] = [pre.text()];
            }
        });
        $.each(selects, function (i, v) {
            var select = $(v);
            var key = select.attr("pharbers-type");
            json[key] = [select.val()];
        });
        return json;
    };

    var manage_json = function (content) {
        var json  = {};
        var inputs= $(content).find('input');
        var pres= $(content).find('pre');
        $.each(inputs, function (i, v) {
            var key = $(v).attr('pharbers-type');
            json[key] = $(v).val();
        });
        $.each(pres, function (i, v) {
            var key = $(v).attr('pharbers-type');
            // console.log(key +":"+ $(v).text());
            json[key] = $(v).text();
        });
        return json;
    };

    var get_json = function (res) {
        var cyc = res[1];
        var cyc_content = res[0];
        var page = res[2];
        var json = {};
        if (cyc !== 0) {
            var user = $.cookie("user");
            if(page === 'decision'){
                json = decision_json(cyc_content);
                json["user"] = user;
                var decision_cyc = cyc+"_decision";
                json["phase"] = [decision_cyc];
                return [json , "ok"]
            }else if(page === 'manage'){
                json = manage_json(cyc_content);
                json["user"] = user;
                var manage_cyc = cyc+"_manage";
                json["phase"] = [manage_cyc];
                return [json , "ok"]
            }else {
                return [json , "nothing"]
            }
        }else {
            return [json , "nothing"]
        }

    };

    var idle_listening = function () {
        $('body').idle({
            onIdle: function () {
                var page = webPage();
                var info = get_json(page);
                if(info[1] === "ok"){
                    idle_request(info[0] , 0)
                }
            },
            idle: 1000
        })
    };

    var idle_request = function (json, time) {
        setTimeout(function () {
            f.ajaxModule.baseCall('/store/input', JSON.stringify(json), "POST", function (r) {
                console.log(r);
            })
        }, time);
    };

    var store_choose = function () {
        f.alert.choose_info("回复操作", ["确定", "取消"], "是否继续上次操作？", function () {
            setTimeout($.cookie("history", "1"),1000)
        }, function () {
            $.cookie("history", "0");
        })
    };
    function getJsonLength(jsonData){

        var jsonLength = 0;

        for(var item in jsonData){

            jsonLength++;

        }

        return jsonLength;

    }

    return {
        "idle_listening"  : idle_listening,
        "store_choose" : store_choose
    }
})(jQuery, window);

window.store_info.idle_listening();
