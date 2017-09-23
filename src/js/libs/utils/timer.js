/**
 * Created by haiming.zeng on 2017/1/6.
 */

console.log("$:",$());
$.fn.timer = function(options) {
    options = options || 'start';
    let time = options.time||60;
    let text = options.text||'s';
    let defaultText = options.defaultText;
    return this.each(function() {
        let $this = $(this);
        $this.data('countDownTime', time);
        var setTime = function () {
            // var timer = $this.data('countDownTimer');
            // try {if (timer) {clearTimeout(timer);} $this.data('countDownTimer', '');}catch(e) {}
            var _time = $this.data('countDownTime');
            console.log("_time:",_time)
            // console.log("timer:",timer)
            if (_time > 0) {
                $this.disable(_time + text);
                $this.data('countDownTime', --_time);
                $this.data('countDownTimer', setTimeout(setTime, 1000));
            } else {
                $this.enable(defaultText);
            }
        };

        setTime();
    });
};
$.fn.disable = function (disableText) {
    return this.each(function () {
        let $this = $(this);
        if($.isEmpty(disableText)){
            $this.addClass('disable').attr('disabled',true)
        }else{
            let defaultText = $this.data('defaultText')||$this.text();
            $this.data('defaultText',defaultText).html(disableText).addClass('disable').attr('disabled',true)

        }

    })
}
$.fn.enable = function (defaultText) {
    var defaultText = defaultText;
    return this.each(function () {
        let $this = $(this);
        // 获得对象默认文本
        defaultText = defaultText||$this.data('defaultText');
        if($.isNotEmpty(defaultText)){
            // 恢复对象可用状态
            $this.html(defaultText).data('defaultText', '');
        }
        $(this).removeClass('disable').attr('disabled',false)
    })
};


