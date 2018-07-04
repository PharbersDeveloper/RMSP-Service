// 该配置文件主要针对于未使用前端架构的js代码，主要实现，Ajax下实现局部刷新，根据设置标识，来找到作用坐标，调用配置者只需要引入相关配置，修改时不必去杂乱的js代码中去寻找，直接改这里就可以，这个只是个初版
var AjaxVisVit = {};
AjaxVisVit.config = {
    Body_Id: "div-content"
}