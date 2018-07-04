(function($,w){

    $(function(){
       // 点击account 退出
       $('.navbar-exit').click(function(e){
           $('.exit-area').toggle();
           $(document).one("click", function(){
               $(".exit-area").hide();
           });
           e.stopPropagation();
       });

        $('.exit-area').click(function(e){
            e.stopPropagation();

            f.alert.choose_info("提示", ["是", "否"], "是否退出？", function () {
                // var uuid = "7aeddad0-3509-4dd2-8411-2dd4cfc923fc";//$("#pharbers_uuid").attr("pharbers-uuid");
                f.cookieModule.clearCookie("uuid");
                w.location.href = "/"
            }, function () {
                
            });


        });

        $('#login-name').text($.cookie("user"));
    });
})(jQuery,window);
