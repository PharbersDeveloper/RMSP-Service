
/**邮箱正则表达式
 * 格式为：xxx@x.com
 */
let emailzz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

/**办公电话验证
 * 格式为：000-0000000或13100001111
 */
let phonezz = /((\d{4})?-?[1-9][0-9]{6,7})|([1-9][34578]\d{9})/;

/**固定电话+手机验证
 * 格式为：0000-00000000或18900000000
 */
let newphonezz = /^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$/;

/**性别验证
 * 格式为：男|女
 */
let patternzz = /^['男'|'女']$/ ;

/**年龄验证
 * 格式为：0-120岁
 */
let agezz = /^([1-9]\d|\d)$/;

/**
 * 数字
 * 格式为：必须为数字
 */
let numberzz = /^([+-]?)\d*\.?\d+$/;

/**
 * 只为正整数数字
 * 格式为：必须为数字
 */
let numberzzs = /^\d+$/;

/**
 * 实数
 * 格式为：必须为数字
 */
let numberzzss = /^\d*\.?\d+$/;

/**
 *
 * @param reg 正则表达式
 * @param value 实际value
 * @return Boolean
 */
const regexExce = function(reg, value) {
    return reg.test(value);
};

/**
 *
 * @param reg 正则表达式
 * @param array 一维数组，如：[1, 2, 3] 不包含Object
 * @return Boolean
 */
const regexArrayExce = function(reg, array) {
    array.some(function(elem, index, array){
        return reg.test(elem);
    });
};
