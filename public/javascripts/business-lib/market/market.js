(function($, w) {

    const check_phase = function() {
        let json = JSON.stringify(f.parameterPrefixModule.conditions({
            "uuid": $('input:hidden[name="uuid"]').val(),
            "phase": parseInt($('input:hidden[name="phase"]').val())
        }));
        f.ajaxModule.baseCall('/phase/status', json, 'POST', function (r) {
            if(r.status === 'ok' && r.result.data.flag === 'ok') {
                //parseInt($('input:hidden[name="phase"]').val())
                if(r.result.data.phase > 1) {
                    $('#cycle2-news').show();
                    $('#cycle2-customer').show();
                }
            }
        })
    };

    $(function() {
        // check_phase();
    });
})(jQuery, window);