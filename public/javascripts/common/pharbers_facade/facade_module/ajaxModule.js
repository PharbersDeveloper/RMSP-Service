var AjaxCall = function () {};

AjaxCall.prototype.baseCall = function (url, data, type, successFun, errorFun, beforeFun, completeFun) {
    var errorFunction = errorFun || function (e) {console.error(e)};
    var beforeFunction = beforeFun || function () {};
    var completeFunction = completeFun || function (e) {};
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        cache: false,
        data: data,
        contentType: "application/json,charset=utf-8",
        Accept: "application/json,charset=utf-8",
        success: function (data) {successFun(data)},
        error: errorFunction,
        beforeSend : beforeFunction,
        complete : completeFunction
    });

};