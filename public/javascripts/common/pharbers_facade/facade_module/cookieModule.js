
var CookieHandler = function () {};

CookieHandler.prototype.cleanAllCookie = function (region) {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    var that = this;
    $.each(keys, function (i, v) { that.clearCookie(v) });
};

CookieHandler.prototype.setCookie = function (cname, cvalue, expire) {
    var expiredays = expire || 1;
    var exp  = new Date();
    exp.setTime(exp.getTime() + expiredays*24*60*60*1000);
    document.cookie = cname + "="+ escape(cvalue) + ";expires=" + exp.toGMTString()+";path="+"/";
};

CookieHandler.prototype.clearCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=''"+";expires="+exp.toGMTString()+";path="+"/";
};
