(function($, w){

    const pharbers_filter = function(inputs_option) {
        let pharber_filter = inputs_option.pharber_filter;
        let other_filter = inputs_option.other_filter;
        let $table = inputs_option.table_jq;
        function filter_hidden (_, elem) {
            if(pharber_filter !== "" && other_filter !== "") {
                return $(elem).attr("pharbers-filter") !== pharber_filter || $(elem).attr("other-filter") !== other_filter
            } else if(pharber_filter === "" && other_filter !== "") {
                return $(elem).attr("other-filter") !== other_filter
            } else if(pharber_filter !== "" && other_filter === ""){
                return $(elem).attr("pharbers-filter") !== pharber_filter
            } else return true
        }
        $table.find('tbody').find('tr').show();
        if(pharber_filter !== "" || other_filter !== "") $table.find('tbody').find('tr').filter(filter_hidden).hide()
    };

    $(function(){

        $('#download-report').click(function(){
            let json = JSON.stringify(f.parameterPrefixModule.conditions({
                "uuid": $('input[name="uuid"]').val(),
                "phase": parseInt($('input[name="phase"]').val())
            }));
            f.alert.loading();
            f.ajaxModule.baseCall('/submit/create', json, 'POST', function(r) {
                if(r.status === 'ok' && r.result.data.flag === 'ok') {
                    layer.closeAll('loading');
                    w.window.open('/download/report/' + r.result.data.path);
                    // w.location = "/report/download/" + r.result.data.path
                }
            });
        });


        {
            let $allot_hospital_select = $('div[name="allot"] div[name="hospitals"]').find('select');
            let $allot_dimension_select = $('div[name="allot"] div[name="dimension"]').find('select');
            let $allot_time_distribution_table = $('div[name="allot"] table[name="time-distribution"]');

            $allot_hospital_select.change(function() {
                let opt = {
                    "pharber_filter": $(this).val(),
                    "other_filter": $allot_dimension_select.val(),
                    "table_jq": $allot_time_distribution_table
                };
                pharbers_filter(opt);
            });

            $allot_dimension_select.change(function() {
                let opt = {
                    "pharber_filter": $allot_hospital_select.val(),
                    "other_filter": $(this).val(),
                    "table_jq": $allot_time_distribution_table
                };
                pharbers_filter(opt);
            });
        }

        {

            let $sales_customer_hospital_select = $('div[name="sales"] div[name="sales-customer"] div[name="hospitals"]').find('select');
            let $sales_customer_product_select = $('div[name="sales"] div[name="sales-customer"] div[name="product"]').find('select');
            let $salse_customer_table = $('div[name="sales"] div[name="sales-customer"] table[name="sales-customer-tb"]');

            $sales_customer_hospital_select.change(function() {
                let opt = {
                    "pharber_filter": $(this).val(),
                    "other_filter": $sales_customer_product_select.val(),
                    "table_jq": $salse_customer_table
                };
                pharbers_filter(opt);
            });

            $sales_customer_product_select.change(function() {
                let opt = {
                    "pharber_filter": $sales_customer_hospital_select.val(),
                    "other_filter": $(this).val(),
                    "table_jq": $salse_customer_table
                };
                pharbers_filter(opt);
            });
        }

        {

            let $sales_deputy_hospital_select = $('div[name="sales"] div[name="sales-deputy"] div[name="personal"]').find('select');
            let $sales_deputy_product_select = $('div[name="sales"] div[name="sales-deputy"] div[name="product"]').find('select');
            let $salse_deputy_personal_table = $('div[name="sales"] div[name="sales-deputy"] table[name="sales-personal-tb"]');

            $sales_deputy_hospital_select.change(function() {
                let opt = {
                    "pharber_filter": $(this).val(),
                    "other_filter": $sales_deputy_product_select.val(),
                    "table_jq": $salse_deputy_personal_table
                };
                pharbers_filter(opt);
            });

            $sales_deputy_product_select.change(function() {
                let opt = {
                    "pharber_filter": $sales_deputy_hospital_select.val(),
                    "other_filter": $(this).val(),
                    "table_jq": $salse_deputy_personal_table
                };
                pharbers_filter(opt);
            });
        }


    });

})(jQuery, window);
