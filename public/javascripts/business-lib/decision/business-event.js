var business_event = (function ($, w) {
    let $content = $('#sum_promotion_budget-cycle1');

    $(function(){
       $('#go_decision').click(function(){

           // let nums = ["1", "2", "3", "4"].map(str => parseInt(str));
           // console.info(nums);

           // let $inputs = $('input');
           // let $select = $('select');
           // let obj = $("input:hidden[name='input']").map(function(val, input){
           //     let vv = $(input).val();
           //     let hospital_name = $inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="budget"]').attr("hospital-name");
           //     let sales = $.map($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="prod_value"]'), function(sales, i){
           //         let rObj = {};
           //         rObj["prod_name"] = $(sales).attr("pharbers-type");
           //         rObj["prod_value"] = parseFloat($(sales).val());
           //         return rObj;
           //     });
           //
           //     let visit = $.map($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="prod_hours"]'), function(sales, i){
           //         let rObj = {};
           //         rObj["prod_name"] = $(sales).attr("pharbers-type");
           //         rObj["prod_hours"] = parseFloat($(sales).val());
           //         return rObj;
           //     });
           //     let rObj = {};
           //     rObj["hosp_code"] = parseInt(vv);
           //     rObj["hosp_name"] = hospital_name;
           //     rObj["phase"] = parseInt($("input:hidden[name='phase']").val());
           //     rObj["budget"] = parseFloat($inputs.filter('[hospital-code="'+ vv +'"]').filter('[name="budget"]').val());
           //     rObj["sales"] =sales;
           //     rObj["salesmen"] = $select.filter('[hospital-code="'+ vv +'"]').filter('[name="salesmen"]').val();
           //     rObj["visit_hours"] = visit;
           //     return rObj;
           // });
           //
           // w.console.info(JSON.stringify(obj));

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
                 w.console.info(r)
            });

           // console.info(JSON.stringify(json_obj));
       });
    });




    // 未封装
    function bind_input_change(region) {
        var $business_tab_li = $('#business_tab li.active');
        var $inputs = (region || $content).find('input');
        var $selects = (region || $content).find('select');
        var $pres = (region || $content).find('pre');

        function input_change(lst) {
            $.each(lst, function(i, v) {
                var pre_attr = '[pharbers-type="' + v.oput + '"]';
                var $pre = $pres.filter(pre_attr);

                var num = 0;
                $.each(v.inputs, function(j ,k){
                    var input_attr = '[pharbers-type="'+ k +'"]';
                    var $input = $inputs.filter(input_attr);
                    $input.keyup(function(){
                        // clean_sum_input(region);
                        if ($input.val() === "") $input.val(0);
                        if ($(this).attr('pharbers-type').indexOf(v.type) !== -1) {
                            num = 0;
                            $.each(v.inputs, function(n, w){
                                var input_attr = '[pharbers-type="'+ w +'"]';
                                var $input = $inputs.filter(input_attr);
                                num += parseFloat($input.val());

                            });
                        }
                        $pre.empty().text(num);
                    });
                });
            });
        }

        function select_change(lst) {
            // 未封装
            $.each(lst, function(i, v){
                var select_attr = '[pharbers-type="'+ v.select +'"]';
                var $select = $selects.filter(select_attr);

                // 下拉框时间绑定
                $select.change(function() {
                    clean_sum_input(region, lst);
                    var that = this;
                    var num = 0;
                    var pre_attr = '[pharbers-pepole="'+ $(that).val() +'"]';
                    var $pre = $pres.filter(pre_attr);

                    $.each(lst, function(i, v2) {
                        var select_attr = '[pharbers-type="'+ v2.select +'"]';
                        var $select = $selects.filter(select_attr);
                        if($(that).attr('pharbers-type') !== $select.attr('pharbers-type')) {
                            if($(that).val() === $select.val()) {
                                $.each(v2.inputs, function(i, v3) {
                                    // console.info('---'+v3);
                                    var input_attr = '[pharbers-type="'+ v3+'"]';
                                    var $input = $inputs.filter(input_attr);
                                    num += parseFloat($input.val());
                                });
                            }
                            // else {
                            //     $.each(v2.inputs, function(i, v4) {
                            //         console.info(v4)
                            //         // num += parseInt(v4.val());
                            //     });
                            // }
                            // console.info("select = " + $select.val() + "->" + num)
                        } else {
                            $.each(v2.inputs, function(i, v5) {
                                // console.info('***'+v5);
                                var input_attr = '[pharbers-type="'+ v5+'"]';
                                var $input = $inputs.filter(input_attr);
                                num += parseFloat($input.val());
                            });
                        }
                    });

                    $pre.empty().text(num);
                });

                // input与下拉框绑定
                $.each(v.inputs, function (i, n) {
                    var input_attr = '[pharbers-type="'+ n +'"]';
                    var $input = $inputs.filter(input_attr);
                    $input.keyup(function() {
                        // clean_sum_input(region);
                        var pre_attr = '[pharbers-pepole="'+ $select.val() +'"]';
                        var $pre = $pres.filter(pre_attr);
                        var num = 0;
                        if ($input.val() === "") $input.val(0);
                        $.each(lst, function(i, n2){
                            var select_attr2 = '[pharbers-type="'+ n2.select +'"]';
                            var $select2 = $selects.filter(select_attr2);
                            if($select.attr('pharbers-type') !== $select2.attr('pharbers-type')) {
                                if ($select.val() === $select2.val()) {
                                    $.each(n2.inputs, function(i, n3) {
                                        var input_attr = '[pharbers-type="'+ n3+'"]';
                                        var $input = $inputs.filter(input_attr);
                                        num += parseFloat($input.val());
                                    });
                                    // console.info('---'+n2.inputs[0]);
                                }
                            }else {
                                $.each(n2.inputs, function(i, n4) {
                                    var input_attr = '[pharbers-type="'+ n4+'"]';
                                    var $input = $inputs.filter(input_attr);
                                    num += parseFloat($input.val());
                                });
                                // console.info('***'+n2.inputs[0]);
                            }
                        });
                        $pre.empty().text(num);
                    });
                });

            });

        }

        if ($business_tab_li.index() === 0) {
            console.log("c1d");
            var history = $.cookie("history");
            var c1_d = $.cookie("c1_decision");
            if(history === "0"&& c1_d === "0"){
                console.log("go_c1d_first");
                $.cookie("c1_decision", "1");
                console.log(cycle1_status);
                // if(cycle1_status){
                //     setHistory(1, "#sum_promotion_budget-cycle1" );
                // }
            }else {
                $.cookie("c1_decision", "1");
                setHistory(1, "#sum_promotion_budget-cycle1" );
            }
            input_change(cycle_1_table_input);
            select_change(cycle_1_table_aggregate_sum_input);
        } else if ($business_tab_li.index() === 1) {
            console.log("c2d")
            var history = $.cookie("history");
            var c2_d = $.cookie("c2_decision");
            if(history === "0" && c2_d ==="0"){
                if(cycle1_status){
                    $.cookie("c2_decision", "1");
                }
            }else {
                if(cycle1_status){
                    $.cookie("c2_decision", "1");
                    setHistory(2, "#sum_promotion_budget-cycle2" );
                }
            }
            input_change(cycle_2_table_input);
            select_change(cycle_2_table_aggregate_sum_input);
        } else {
            console.warn("find a lot of 'li'")
        }

    }

    var setHistory = function (cyc, id) {
        var user = $.cookie("user");
        var json = {
            "phase" : [cyc+"_decision"],
            "user" : user
        };
        // console.log(json);
        f.ajaxModule.baseCall("/fetch/input", JSON.stringify(json), "POST", function (r) {
            if(r.status === 'ok'){
                var content = $(id);
                var res = r.result.input;
                var inputs = content.find('input');
                var selects = content.find('select');
                var pres = content.find('pre');
                $.each(inputs, function(i ,v){
                    var key = $(v).attr("pharbers-type");
                    var r = res[key];
                    if(r === undefined){
                        console.log(key)
                    }else {
                        $(v).val(r[0]);
                    }


                });
                $.each(selects, function (i, v) {
                    var key = $(v).attr("pharbers-type");
                    var r = res[key];
                    if(r === undefined){
                        console.log(key)
                    }else {
                        $(v).val(r[0]);
                    }


                });
                $.each(pres, function (i, v) {
                    var key = $(v).attr("pharbers-type");
                    var r = res[key];
                    if(r===undefined){
                        // console.log(key);
                        $(v).text(res["unknownError"])
                    }else {
                        $(v).text(r[0]);
                    }

                })
            }
        })
    };

    // 未封装
    var clean_sum_input = function(region, lst) {
        var $pres = (region || $content).find('pre');
        var $inputs = (region || $content).find('input');
        var $selects = (region || $content).find('select');
        var people = ['小宋', '小兰', '小木', '小白', '小青'];

        $.each(people, function(i, v) {
            var num = 0;
            var pre_attr = '[pharbers-pepole="'+ v +'"]';
            var $pre = $pres.filter(pre_attr);
            $.each(lst, function(i, v2){
                var select_attr = '[pharbers-type="'+ v2.select +'"]';
                var $select = $selects.filter(select_attr);
                // debugger;
                if($select.val() === v) {
                    $.each(v2.inputs, function(i, v3) {
                        var input_attr = '[pharbers-type="'+ v3 +'"]';
                        var $input = $inputs.filter(input_attr);
                        num += parseFloat($input.val());
                    });
                    $pre.empty().text(num);
                }else {
                    $pre.empty().text(num);
                }
            });
        });


    };

    return {
        "bind_input_change": bind_input_change
    }

})(jQuery, window);