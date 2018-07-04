//访问整个Asset资源路径，在初始main后就已经加载，注意这是该变量的作用于是全局，有需要在js里面动态添加资源的就用，不需要就不用理会
var asset_resources;

//业务决策点击下一步的时候保存json数据
var next_save_cycle1_business_decision_json_data;
var next_save_cycle2_business_decision_json_data;

//保存周期计算是否已经提交
var cycle1_status = false;
var cycle2_status = false;



// form结合形成json
$.fn.serializeObject = function() {
    let o = {};
    let a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

let f = new Facade();


//页面
var rsmp_page = "unknown";
