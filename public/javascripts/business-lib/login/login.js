(function($, w){
    // var f = new Facade();
    $(function() {
        $('#signin').click(function() {
            var user = JSON.stringify(f.parameterPrefixModule.conditions({"account": $('#user-name').val(), "password": md5($('#user-password').val())}));
            f.cookieModule.setCookie("log_status" ,"1");
            f.ajaxModule.baseCall("/user/authpwd", user, "POST", function(r) {
                if (r.status === 'ok') {
                    f.cookieModule.setCookie("user_token", r.result.user_token);
                    f.cookieModule.setCookie("user", r.result.user);
                    f.cookieModule.setCookie("log_status" ,"0");
                    f.cookieModule.setCookie("c1_decision","0");
                    f.cookieModule.setCookie("c2_decision","0");
                    f.cookieModule.setCookie("c1_manage","0");
                    f.cookieModule.setCookie("c2_manage","0");
                    w.location = '/index';
                    // w.location = '/brd';
                } else {
                    f.cookieModule.setCookie("log_status" ,"1");
                    f.alert.alert_warn('登入信息', '登入失败，请检查用户名与密码是否正确！');
                }
            });
        });

        $(document).keyup(function(event){
            if(event.keyCode === 13){
                // $("#signin").trigger("click");
                $('#signin').click();
            }
        });
    });
})(jQuery, window);