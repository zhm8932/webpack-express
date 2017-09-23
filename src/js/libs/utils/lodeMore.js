/**
 * Created by haiming.zeng on 2017/3/28.
 */

import * as util from './index';
// const LodeMore = function({url,html,data,msg='没有更多信息',initData,main='.list-ul',options}) {
const LodeMore = function(options) {
    var isEnd = false;/*结束标志*/
    var isAjax = false;/*防止滚动过快，服务端没来得及响应造成多次请求*/
    var defaults = {
        isEnd:false,
        isAjax:false,
        isLazyload:true,
        page:2,
        url:'',
        html:null,
        initData:null,
        renderDomComplete:null,
        msg:'没有更多信息',
        main:'.list-ul',
        otherHeigth:0,
        data:{},
        isForEach:false,  //是否在在内部遍历
    }
    this.opts = $.extend({},defaults,options);
	this.$main = $(this.opts.main);
    let winHeight = $(window).height(),
        scrollHeight = $('body').height();
    // console.log("winHeight:",winHeight)
    // console.log("scrollHeight:",scrollHeight);

    let self = this;
    let loadFooter = `<div class="loader-footer">
                        <div class="loader-loading">
                            <i class="ui-loadings"></i>
                        </div>
                        <div class="loader-text"><em>${this.opts.msg}</em></div>
                    </div>`;
	this.$main.after(loadFooter);
	this.$loaderFooter = this.$main.next('.loader-footer');
    //滚动加载
    $(window).scroll(function () {
        /*滚动加载时如果已经没有更多的数据了、正在发生请求时，不能继续进行*/
        let pageCount = parseInt(self.$main.attr("data-pageCount"));
        let pageNo = parseInt(self.$main.attr("data-pageNo"));
        if(!pageNo){
	        self.$main.attr("data-pageNo",1);
            pageNo = parseInt(self.$main.attr("data-pageNo"));
        }
        console.log("isAjax:",self.opts.isAjax,"isEnd:",self.opts.isEnd)
        if(self.opts.isEnd == true || self.opts.isAjax == true){
            return;
        }
        //有总页数、且页数大于当前页码
        if(pageCount>0&&pageCount>pageNo){
            let scrollTop = $(this).scrollTop();
            let docHeight = $(document).height();
            // console.log("docHeight:",docHeight)
            if (scrollTop>=docHeight- winHeight-self.opts.otherHeigth){
                console.log("到底部啦：",self.opts.page);
                // console.log("initData:",typeof initData);
                //动态获查询参数
                if(typeof self.opts.initData =="function"){
                    self.opts.data = $.extend({},self.opts.data,self.opts.initData())
                }
                self.getData(self.opts.data);
            }
        }else{
            //当前页面等于总页数时、结束请求
            // console.log("不能再加载了");
            if(pageNo>1){
	            self.opts.isEnd = true;
	            self.$loaderFooter.addClass('no-more');
	            self.$loaderFooter.find('.loader-loading').hide();
            }
            //提示没有了
            return false
        }

    })
}

LodeMore.prototype = {
    initLoadMore(){
	    this.opts.isEnd = false;
	    this.opts.page = 2;
	    this.$main.attr("data-pageNo",1);
	    console.log("this.$loaderFooter:",this.$loaderFooter)
	    this.$loaderFooter.removeClass('no-more');
	    this.$loaderFooter.find('.loader-loading').hide();
    },
    getData:function (data) {
        let serialize = $.extend({},{pageNo:this.opts.page},data);
        // console.log("serialize:",serialize)
        let self = this;
        self.opts.isAjax = true;
        $.ajax({
            url: this.opts.url,
            type: 'GET',
            data: serialize,
            dataType: 'json',
            beforeSend:function () {
	            self.$loaderFooter.find('.loader-loading').show();
                self.opts.beforeSend&&self.opts.beforeSend();

            }
        }).done(function (json) {
	        self.opts.isAjax = false;
            let {data,pageNo,pageCount} = json;
            console.log("pageCount:",pageCount,"pageNo:",pageNo,"isAjax",self.opts.isAjax,"isEnd",self.opts.isEnd);
            pageNo = pageNo?pageNo:self.$main.attr("data-pageNo");
            pageCount = pageCount?pageCount:self.$main.attr("data-pagecount");
            console.log("pageCount:",pageCount,"pageNo:",pageNo,"isAjax",self.opts.isAjax,"isEnd",self.opts.isEnd);

            pageNo = parseInt(pageNo);
            pageCount = parseInt(pageCount);

	        // self.$loaderFooter.find('.loader-loading').hide();

            let resultHtml = '';
            //当前页码不大于总页数 页码加一
            if(pageNo&&pageCount>=pageNo){
                //当前页
	            self.$main.attr("data-pageNo",self.opts.page);
                if(self.opts.page<pageCount){
                    self.opts.page++;
                }
                if(data&&data.length){
                    if(!self.opts.isForEach){
	                    resultHtml = self.opts.html&&self.opts.html(data,serialize)
                    }else{
	                    data.forEach(function (item) {
		                    resultHtml+= self.opts.html&&self.opts.html(item,serialize)
	                    })
                    }
                }
                // console.log("resultHtml:",resultHtml)
	            self.$main.append(resultHtml);
                if(typeof self.opts.renderDomComplete =="function"){
                    self.opts.renderDomComplete();
                };
                //图片懒加载处理
                if(self.opts.isLazyload&&self.$main.find('img').length){
	                self.$main.find('img').lazyload({
                        effect: "fadeIn",
                        load:function () {
                        }
                    });
                }

            }
            console.log("self.opts.page:",self.opts.page,"pageNo:",pageNo,"pageCount:",pageCount,pageNo == pageCount);

        }).fail(function (err) {
            console.log("err:",err);
        });
    }
}

var lodeMore = function (options) {
    return new LodeMore(options)
}
module.exports = lodeMore;