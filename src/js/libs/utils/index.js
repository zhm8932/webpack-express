"use strict";

//去左右空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//jquery 插件
import './jqPlugins';

export function formatDate(value, format) {
    var t = new Date(value);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}


//获取字节长度
export function getLength(str) {
    var realLength = 0,charCode;
    for (let i = 0; i < str.length; i++)
    {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 0.5;
        else
            realLength += 1;
    }
    // console.log(realLength);
    return realLength;
}
//解析url为json
export function parseQueryString(str) {
    let search = str||window.location.search;
    // console.log("search:",search)
    search = search.substring(1);
    search = search?search.split('&'):[];
    let obj = {};
    search&&search.forEach(function (item,index) {
        let arr = item.split('=');
        // console.log("item:",item)
        obj[arr[0]]= decodeURI(arr[1])
    })
    // console.log("obj:",obj)
    return obj;
}
/**
 * 获得请求参数
 * @param url       请求路径
 * @param name      参数名
 * @returns {string}
 */
 export function getQueryString(url, name) {
    if (arguments.length === 0) {
        return false;
    } else if (arguments.length === 1) {
        name = url;
        url = location.href;
    }
    var search = /\?/.test(url) ? url.split('?')[1] : url;
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    return reg.test(search) ? RegExp.$2 : '';
}
//校验手机号是否合法
export function isTel(mobilenum){
    if(mobilenum == ""){
        return false;
    }
    var reg_phone=/^((13\d{9}$)|(15\d{9}$)|(18\d{9}$)|(14\d{9})$|(17\d{9})$)/;
    if(!reg_phone.exec(mobilenum)){
        return false;
    }
    return true;
}
//校验是否为空值
export function isEmpty(obj){
    var reg =/^\s*$/g;
    if(reg.test(obj) === false)
    {
        return  false;
    }
    return true;
}
export function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        return  false;
    }
    return true;
}
//验证是否为汉字
export function isChinese(obj){
    // if((/^[\u4e00-\u9fa5]+/).test(obj)){
    //[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*
    if((/^[\u4e00-\u9fa5]+/).test(obj)){
        return true
    }
    return false;
}
//验证是否为2-20个汉字姓名
export function isChineseName(obj){
    if((/^[\u4E00-\u9FA5]{2,20}$/).test(obj)){
        return true
    }
    return false;
}
//是否为正整数
export function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    return re.test(s)
}
//是否为登录密码
export function isPassword(str) {
    // var reg = /^[a-zA-Z0-9]{8,20}$/;
    var str = str.trim();
    var reg = /[a-zA-Z]+(?=[0-9]+)|[0-9]+(?=[a-zA-Z]+)/g;
    return reg.test(str)&&str.length>=8&&str.length<=20;
}

//显示加载状态
export function isLoadings({ele='.list',show=true}={}) {
	let $ele = $(ele);
    let $uiLoadings = $ele.next('.ui-loadings');
    console.log("$uiLoadings.length:",$uiLoadings.length)
    if($uiLoadings.length){
        if(show){
	        $uiLoadings.show();
        }else{
	        $uiLoadings.hide();
        }
    }else {
        console.log("插入")
	    $ele.after('<div class="ui-loadings"></div>');
    }

}

//常用方法
export const dialog = require('./dialog');
export const msg = require('./msg');
export const serialize = require('./serialize');
export const ajax = require('./ajax');
export const lodeMore = require('./lodeMore');
export const browser = require('./browser');
