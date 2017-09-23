/**
 * Created by haiming.zeng on 2017/1/6.
 */
// 工具类

$.extend($, {
    isEmpty: function(obj) {
        return obj == null || obj === '';
    },
    isNotEmpty: function(obj) {
        return !this.isEmpty(obj);
    },
});

/**
 * 拓展属性方法
 */
$.extend($.fn, {
    //下拉选择
	select: function({index,value,ele='.select-box'}={}) {
		let $self = $(this);
		console.log("this:",this);
		console.log("$self:",$self);
		let $body = $('body');
		if (!$body.data('select')) {
			$body.data('select',1);
			$body.on('click', function() {
				if ($self.hasClass('open')) {
					$self.removeClass('open');
				}
			})
			//显示选择框
			$body.on('click',ele,function(e) {
				e.stopPropagation();
				$(this).toggleClass('open');
				let target = $(e.target);
				if (target.is('li')) {
					target.addClass('active').siblings().removeClass('active');
					let $selectedText = $(this).find('.selected .text');
					let value = target.attr('data-value');
					let html = target.html();
					// console.log("$selectedText:",$selectedText)
					if ($selectedText[0].tagName == 'INPUT') {
						$selectedText.val(html);
					} else {
						$selectedText.html(html);
					}

					$selectedText.siblings('input[type="hidden"]').val(value);
					$self.removeClass('open');
				}
			})
		}
		//设置默认值
		return this.each(function(i, item) {
			// console.log("item:",item,index,isNaN(index),value)
			// let $li = $this.find('[data-value=' + bValue + ']');
			let $self = $(this);
			let $li = $self.find('li');
			// 如果index存在,则设置默认值 为index-1索引
			if ($li.length > 0) {
				//不是数字
				if(index&&isNaN(index)){
					console.log("index:",index)
					return
				};
				if(value){
					// console.log("$li:",$li)
					$li.each((j,arr)=>{
						if($(arr).attr('data-value')==value){
							index = j+1;
						}
					})
				}
				//默认索引必须当前范围内
				if(index-1>$li.length){
					index = 1;
				}
				let $selectedText = $self.find('.text');
				let $defaultLi = $($li[parseInt(index-1)]);   //设默认li的值
				$defaultLi.addClass('active');
				$self.find('input').val($defaultLi.attr('data-value')); //.end().find('.text').html($li.html())
				if ($selectedText.length > 0) {
					$selectedText[0].nodeName === 'INPUT' ? $selectedText.val($defaultLi.html()) : $selectedText.html($defaultLi.html());
				}
			}
		})
	},

    //禁用
    disable: function(disableText) {
        return this.each(function() {
            let $this = $(this);
            if ($.isEmpty(disableText)) {
                $this.addClass('disable').attr('disabled', true)
            } else {
                let defaultText = $this.data('defaultText') || $this.text();
                $this.data('defaultText', defaultText).html(disableText).addClass('disable').attr('disabled', true)
            }
        })
    },
    //启用
    enable: function(defaultText) {
        var defaultText = defaultText;
        return this.each(function() {
            let $this = $(this);
            // 获得对象默认文本
            defaultText = defaultText || $this.data('defaultText');
            if ($.isNotEmpty(defaultText)) {
                // 恢复对象可用状态
                $this.html(defaultText).data('defaultText', '');
            }
            $(this).removeClass('disable').attr('disabled', false)
        })
    },
    //定时器
    timer: function(options) {
        options = options || 'start';
        let time = options.time || 60; //默认时长
        let text = options.text || 's'; //默认单位
        let defaultText = options.defaultText;  //默认内容
	    let timeEnd = options.timeEnd;
        return this.each(function() {
            let $this = $(this);
            $this.data('countDownTime', time);
            var setTime = function() {
                // var timer = $this.data('countDownTimer');
                // try {if (timer) {clearTimeout(timer);} $this.data('countDownTimer', '');}catch(e) {}
                var _time = $this.data('countDownTime');
                // console.log("_time:",_time)
                // console.log("timer:",timer)
                if (_time > 0) {
                    $this.disable(_time + text);
                    $this.data('countDownTime', --_time);
                    $this.data('countDownTimer', setTimeout(setTime, 1000));
                } else {
	                timeEnd&&timeEnd(); //定时结束时执行
                    $this.enable(defaultText);
                }
            };

            setTime();
        });
    }
})
