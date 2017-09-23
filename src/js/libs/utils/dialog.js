function Dialog(options){
    var defaults = {
        okBtn:'ok',  //确定按钮
        cancelBtn:'cancel',    //取消按钮
        closeBtn:'close',      //关闭
        globalBg:'globalBg',    //锁屏背景
        dialogBox:'dialogBox',
        otherClass:'',
        otherBox:'',
        isHide:true,     //是否自动隐藏弹框
        isMore:false,   //是否同时出现多个弹框
        isCancel:true,  //是否有取消按钮
        isOk:true,       //是否有提交按钮
        isClose:true,       //是否有关闭按钮
        isCancelSubmit:false,       //取消按钮的提交事件
        otherMsg:'',    //其他提示信息 底部的
        title:'',
        msg:'请输入内容',
        delayTime:2000,
        okText:'确定',
        cancelText:'取消',
        ok:null,        //确定回调
        cancel:null,         //取消回调
        close:null,          //关闭
        callback:null,          //页面渲染需要的js执行完后执行，此处为计算弹框宽和高
        completeRenderFun:null  //渲染完成执行
    };
    this.opts = $.extend({},defaults,options);
    this.dialogBox = this.opts.dialogBox;
    this.$body = $('body',document);
    this.init()
}
Dialog.prototype = {
    init:function(){
        var self = this;
        self.render();
        $('.'+self.dialogBox).show();
        let okBtn = self.opts.okBtn;
        //事件解绑
        self.$body.off('click','.'+okBtn);
        self.$body.off('click','.'+self.opts.cancelBtn);
        self.$body.on('click','.'+okBtn,function(){
            self.opts.ok&&self.opts.ok();
            if(self.opts.isHide){
                self.hideBox()
            }
        });
        $(window).on('keydown',function(e){
            if(e.keyCode =='13'){
                self.opts.ok&&self.opts.ok();
                if(self.opts.isHide){
                    self.hideBox()
                }
            }
        });

        var close = '.'+this.opts.closeBtn;
        //点击关闭
        this.$body.on('click',close,function(){
            // self.cancelCallback();
            self.closeCallback();
        })

        var cancelBtn = '.'+self.opts.cancelBtn;
        //点击取消
        this.$body.on('click',cancelBtn,function(){
            self.cancelCallback();
        })

    },
    hideBox:function(cb){
        var self = this;
        setTimeout(function(){
            $('.'+self.getdialogBox()).hide();
            //console.log(self.opts)
            if(!self.opts.isMore){
                $('.'+self.opts.globalBg).hide();
            }
            cb&&cb()
        },self.opts.delayTime)
    },
    globalBgFn:function(){
        var globalBgHtml = '<div class="globalBg"></div>';
        if($('.globalBg').length){
            $('.globalBg').show();
        }else{
            this.$body.append(globalBgHtml)
        }
    },
    getdialogBox:function () {
        var dialogBox = this.dialogBox;
        if(this.opts.isMore){
            dialogBox = this.opts.otherBox;
        }
        return dialogBox;
    },
    render:function(completeFun){
        var self = this;
        self.globalBgFn();
        if(!self.opts.isMore){
            if($('.'+self.dialogBox).length){
                $('.'+self.dialogBox).remove();
                self.$body.append(self.dialogHtml())

            }else{
                self.$body.append(self.dialogHtml())
            }
        }else{
            self.$body.append(self.dialogHtml())
        }
        if(!self.opts.isOk&&!self.opts.isCancel){
            $('.'+self.dialogBox).find('.submitBox').remove()
        }

        self.opts.callback && self.opts.callback();
        var width = $('.'+this.opts.dialogBox).outerWidth();
        var height = $('.'+this.opts.dialogBox).height();
        var winHeight  = $(window).height();
        height = height>winHeight?winHeight:height;
        // console.log("heightheightheight:",height)
        if(self.opts.isMore){
            height = $('.'+this.opts.otherBox).height();
            width = $('.'+this.opts.otherBox).outerWidth();
            $('.'+this.opts.otherBox).css({'height':height,'margin-top':-height/2,'margin-left':-width/2});
        }else{

            $('.'+this.opts.dialogBox).css({'height':height,'margin-top':-height/2,'margin-left':-width/2});
        }

        // console.log("winHeight:",winHeight)
        // console.log("height:",height)
        if(height>=420){
            $('.'+this.opts.dialogBox).find('article').css({"overflow-y":"scroll"})
        }
        this.opts.completeRenderFun&&this.opts.completeRenderFun();

    },
    dialogHtml:function(){
        var opts = this.opts;
        var title = opts.title?`<h4 class="title">${opts.title}</h4>`:'';
        var closeHtml = ''
        if (typeof opts.msg === 'object' && opts.msg.nodeType === 1) {
            opts.msg = opts.msg.outerHTML;
        }
        if (typeof opts.otherMsg === 'object' && opts.otherMsg.nodeType === 1) {
            opts.otherMsg = opts.otherMsg.outerHTML;
        }
        if(opts.isClose){
            closeHtml = '<span class="'+opts.closeBtn+'">关闭</span>'
        }
        var ConfimHtml =
            '<div class="'+this.dialogBox+' '+opts.otherBox+'" style="width: '+opts.width+'px;margin-left:-'+opts.width/2+'px">' +
                '<div class="inner">'+title + closeHtml +
                    '<article>'+opts.msg+'</article>' +
            '<div class="submitBox">';

        if(opts.isCancel){
            ConfimHtml+='<button class="'+opts.cancelBtn+'">'+opts.cancelText+'</button>';
        }
        if(opts.isOk){
          ConfimHtml+='<button class="'+opts.okBtn+'">'+opts.okText+'</button></div>';
        }
        if(opts.otherMsg){
            ConfimHtml+='<div class="other "+opts.otherClass>'+opts.otherMsg+'</div>'
        }
        ConfimHtml+='</div></div>';
        return ConfimHtml
    },
    closeCallback:function(){   //关闭弹窗
        $('.globalBg').hide();
        $('.'+this.dialogBox).remove();
        this.opts.close && this.opts.close();
    },
    cancelCallback:function(){   //取消
        var self = this;
        if(self.opts.isCancelSubmit){
            self.opts.cancel && self.opts.cancel();
            if(self.opts.isHide){
                self.hideBox()
            }
            return false
        }

        var dialogBox = '';
        if(!this.opts.isMore){
            $('.globalBg').hide();
            dialogBox = this.dialogBox;
        }else{
            dialogBox = this.opts.otherBox;
        }
        $('.'+dialogBox).remove();
        this.opts.cancel && this.opts.cancel();
    }
};
let dialog = function (options) {
    return new Dialog(options)
}
module.exports = dialog;