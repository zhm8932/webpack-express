/**
 * Created by haiming.zeng on 2017/2/23.
 */
const ajax = function ({url,method='GET',data,done,error,beforeSend}) {
    return new Promise(function (resolve,reject) {
        $.ajax({
            method:method,
            url:url,
            beforeSend:function () {
                if(beforeSend){beforeSend()}
            },
            data:data,
        }).done(function (json) {
            // console.log("json:",json)
            if(json.code=='40080003'||json.code=='40080005'){
                //缓存返回的跳转地址
                sessionStorage.setItem('bu',window.location.href); //返回跳转地址
                return window.location='/cus/login'
            }
            if(done){done(json)}
            resolve(json)
        }).fail(function (err) {
            console.log("err:",err)
            if(error){error(err)}
            reject(err)
        })
    })

};

module.exports = ajax;