/**
 * Created by yym on 2/5/18.
 */

(function ($, w) {
    var f = new Facade();
    var wrapper = $('.wrapper');
    wrapper.css('height','100%');
    wrapper.css('backgroundImage','url("/assets/images/version_2/login_bg.png")');
    wrapper.css('backgroundSize','cover');
    wrapper.css({'position':'absolute','left':0,'top':0,'width':'100%'})
    $(function () {
        f.alert.choose_info("提示", ["是", "否"], "是否继续上一次操作？", function () {
            // var uuid = "7aeddad0-3509-4dd2-8411-2dd4cfc923fc";//$("#pharbers_uuid").attr("pharbers-uuid");
            var uuid = $("#pharbers_uuid").attr("pharbers-uuid");
            w.location.href = "/takelast/" + uuid;
        }, function () {
            w.location.href = '/start';
        })
    });
})(jQuery, window);
