//信息提示框
function Msg(options){
    var defaults = {
        closeBtn:'.closeBtn',
        mainCell:'msgBox',
        otherBox:'',
        title:'提示语',
        delayTime:2000,
        width:300,
        height:50,
        effect:'fade',
        isHide:true,
        callback:false
    };

    this.options = $.extend({},defaults,options);
    this.mainCell = this.options.mainCell;

    this.init();
}
Msg.prototype = {
    init:function(){
        var self = this,
            opts = self.options,
            effect = opts.effect,
            interTime = opts.interTime;
        //console.log(effect)
        switch (effect){
            case 'fade':
                this.render();
                $('.'+self.mainCell).fadeIn();
                break;

        }
        if(opts.isHide){
            self.hideMsg(opts.callback)
        }
    },
    setHtml:function(){
        return '<div class="'+this.options.mainCell+' '+this.options.otherBox+'"></div>'
    },
    hideMsg:function(cb){
        var self = this;
        setTimeout(function(){
            $('.'+self.mainCell).hide().removeAttr('style');
            if(typeof cb=='function'){
                cb();
            }

        },this.options.delayTime)
    },
    render:function(){
        var boxHtml = '';
        var opts = this.options,
            width=opts.width,
            height=opts.height||$('.'+mainCell).height(),
            mainCell=opts.mainCell;
        if(!$('.'+mainCell).length){
            $('body').append(this.setHtml());
        }else{
            $('.'+mainCell).show();
        }
        $('.'+mainCell).removeAttr('style');
        $('.'+mainCell).html(this.options.title);
        height = height<=24?48:height;
        // console.log("height：",height)
        var bdlw = $('.'+mainCell).css('border-left-width'),
            bdrw = $('.'+mainCell).css('border-right-width');
        // var realwidth = width-parseInt(bdlw)-parseInt(bdrw);
        var realwidth = width;
        if(!opts.otherBox){
            $('.'+mainCell).css({width:realwidth+'px',height:height+'px','margin-left':-width/2,'margin-top':-height/2}).show()
            // $('.'+opts.mainCell).css({width:width+'px',height:height+'px','line-height':height+'px','margin-left':-width/2,'margin-top':-height/2}).show()
        }
    }
};
const msg = function (options) {
    return new Msg(options)
}
module.exports = msg;