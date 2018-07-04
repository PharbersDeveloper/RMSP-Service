(function($, w) {
    $(function(){
        $('#logout').click(function() {
            f.cookieModule.clearCookie("c1_decision");
            f.cookieModule.clearCookie("c1_manage");
            f.cookieModule.clearCookie("c2_decision");
            f.cookieModule.clearCookie("c2_manage");
            f.cookieModule.clearCookie("c2_manage");
            f.cookieModule.clearCookie("log_status");
            f.cookieModule.clearCookie("user");
            f.cookieModule.clearCookie("user_token");
            w.location.reload();
        });
    });
})(jQuery, window);