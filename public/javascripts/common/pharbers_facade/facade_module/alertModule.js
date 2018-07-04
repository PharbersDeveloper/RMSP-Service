function Alert() {}

(function() {

    this.alert_success = function (title, content) {
        let t = title || "信息";
        let c = content || "成功" ;
        layer.alert(c, {
            skin: 'layui-layer-lan',
            title: t,
            icon: 1,
            closeBtn: 0,
            anim: 0
        });
    };

    this.alert_error = function (title, content) {
        let t = title || "信息";
        let c = content || "错误" ;
        layer.alert(c, {
            skin: 'layui-layer-lan',
            title: t,
            icon: 2,
            closeBtn: 0,
            anim: 0
        });
    };

    this.alert_warn = function (title, content) {
        let t = title || "信息";
        let c = content || "警告";
        layer.alert(c, {
            skin: 'layui-layer-lan',
            title: t,
            icon: 3,
            closeBtn: 0,
            anim: 0
        });
    };
    this.choose_info = function (title , options, message ,func_one, func_two) {
        let t = title || "选择";
        let arr = options || ["确定", "取消"];
        let msg = message || "请选择";
        //询问框
        let num = layer.confirm( msg , {
            title: t,
            closeBtn: 0,//关闭按钮
            btn: arr //按钮
        }, function(){
            func_one();
            layer.close(num);
        }, function(){
            func_two();
            layer.close(num);
        });
    };
    this.loading = function(display) {
        if(display === true) {
            $('.loading').show();
        } else {
            $('.loading').hide();
        }


    };


}).call(Alert.prototype);
