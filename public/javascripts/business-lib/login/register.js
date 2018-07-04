(function ($, w) {
    "use strict";
    var f = new Facade();
    var validation;

    $(function () {
        // TODO: 这个结束后封装起来
        validation = $("#register-form").validate({
            rules: {
                account: {
                    required: true,
                    pattern: {
                        pattern: /^[0-9a-zA-Z]*$/
                    },
                    remote: function () {
                        var r = {
                            type: "POST",
                            url: "/register/check/name",
                            dataType: "json",
                            data: JSON.stringify({"user": {"account": $("#account").val()}}),
                            contentType: "application/json,charset=utf-8",
                            Accept: "application/json,charset=utf-8",
                            dataFilter: function (data) {
                                var tmp = JSON.parse(data)
                                if (tmp.status === "ok") {
                                    return true
                                }else {
                                    return false
                                }
                            }
                        }
                        return r;
                    }

                },
                password: {
                    minlength: 6
                },
                confirmpwd: {
                    minlength: 6,
                    equalTo: "#password"
                },
                email: {
                    email: true,
                    remote: function () {
                        var r = {
                            type: "POST",
                            url: "/register/check/email",
                            dataType: "json",
                            data: JSON.stringify({"user": {"email": $("#email").val()}}),
                            contentType: "application/json,charset=utf-8",
                            Accept: "application/json,charset=utf-8",
                            dataFilter: function (data) {
                                var tmp = JSON.parse(data)
                                if (tmp.status === "ok") {
                                    console.log(data);
                                    return true;
                                } else {
                                    console.log(data);
                                    return false;
                                }
                            }
                        };
                        return r;
                    }
                },
                phone: {
                    required: true,
                    remote: function () {
                        var r = {
                            type: "POST",
                            url: "/register/check/phone",
                            dataType: "json",
                            data: JSON.stringify({"user": {"phone": $("#phone").val()}}),
                            contentType: "application/json,charset=utf-8",
                            Accept: "application/json,charset=utf-8",
                            dataFilter: function (data) {
                                var tmp = JSON.parse(data);
                                if (tmp.status === "ok") {
                                    return true
                                }else {
                                    return false
                                }
                            }
                        };
                        return r;
                    },
                    maxlength: 11,
                    minlength: 11

                },
                age: {
                    digits: true
                }
            },
            messages: {
                account: {
                    required: "请填写账户名",
                    remote: "用户名重复，请重新输入"
                },
                name: "请输入姓名",
                password: {
                    required: "请填写密码",
                    minlength: "密码长度必须大于5位"
                },
                confirmpwd: {
                    required: "请填写确认密码",
                    minlength: "密码是长度必须大于5位",
                    equalTo: "两次密码输入不一致"
                },
                company: "请填写公司名",
                phone: {
                    required: "请填写手机号码",
                    remote: "电话号码重复，请重新输入",
                    maxlength: "手机号码错误",
                    minlength: "手机号码错误"
                },
                department: "请填写部门",
                email: {
                    email: "请填写正确的邮箱",
                    remote: "邮箱名称重复，请重新输入"

                },
                age: "请填写正确的年龄"
            },
            errorElement: "em",
            errorPlacement: function (error, element) {
                error.addClass("help-block");
                element.parent().addClass("has-feedback");
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.parent("label"));
                } else {
                    error.insertAfter(element);
                }

                if (!element.next("span")[0]) {
                    $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
                }
            },
            success: function (label, element) {
                if (!$(element).next("span")[0]) {
                    $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parent().addClass("has-error").removeClass("has-success");
                $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parent().addClass("has-success").removeClass("has-error");
                $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
            }
        });

        $('#submit').click(function () {
            if (validation.form()) {
                var formObj = $('#register-form').serializeObject();
                formObj['password'] = md5(formObj.password);
                var json = JSON.stringify(f.parameterPrefixModule.business('user', formObj));
                f.ajaxModule.baseCall('/user/register', json, 'POST', function (r) {
                    if (r.status === 'ok') {
                        if (r.result.data.flag === true) {
                            f.alert.alert_success('注册', '注册成功！');
                            setTimeout(function () {
                                window.location.href = "/login"
                            }, 2000);
                        }
                        else f.alert.alert_error('注册', '遇到未知错误，请联系管理员！');
                    } else {
                        f.alert.alert_error('注册', r.error.message);
                    }
                });
            }
        });

        $(document).keyup(function (event) {
            // console.info($("#account").val())

            if (event.keyCode === 13) {
                $('#submit').click();
            }
        });
    });
    var repeatCheck = function (url, para) {
        var obj = {};
        var other = {};
        var v = $("#" + para).val();
        other[para] = v;
        obj["user"] = other;
        console.log($("#" + para));
        var r = {
            type: "POST",
            url: url,
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json,charset=utf-8",
            Accept: "application/json,charset=utf-8",
            dataFilter: function (data) {
                if (data.status === "ok") {
                    return true;
                } else {
                    return false;
                }
            }

        };
        return r;
    };

    $.validator.addMethod("pattern",function (value, element, param) {
        return param.pattern.test(value);
    },"输入只能为字母或数字");

})(jQuery, window);

