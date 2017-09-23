/*
 * 系列化表单的值，得到json对象的值
 * @param    ele    {String}   父级class或id,默认为.form
 * @param    child  {String}   默认为input,textarea,select标签
 *
 * 运行实例:外部调用  var serialize = util.serialize()
 * */
const serialize = function (ele = '.form', child = 'input,textarea,select,checkbox') {
    // var $inputs = $(ele).find('input,textarea,select'),
    var $inputs = $(ele).find(child),
        serialize = {}, key;
    if ($inputs.length) {
        $.each($inputs, function (index, item) {
            key = $(item).attr('name');
            if (key) {
                if ($(item).attr('type') == 'checkbox') {
                    serialize[key] = $(item).is(":checked");
                } else if ($(item).attr('type') == 'radio') {
                    serialize[key] = $($(item)[0].tagName + '[name=' + key + ']:radio:checked').val();
                } else {
                    serialize[key] = $(item).val();
                }

            }
        })
    }
    // console.log("serialize:", serialize)
    if (!$(ele).length) {
        throw new Error('不存在该对象!--------------》' + ele + '');
    }

    return serialize
}

module.exports = serialize;