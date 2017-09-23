/**
 * Created by haiming.zeng on 2017/9/19.
 */
import '../../sass/news.scss';
import * as utils from '../libs/utils';
$(function () {
	//分页加载
	var loadMore = utils.lodeMore({
		url:'/news/list',
		main:'.list ul',
		isLazyload:false,
		otherHeigth:300,
		html:function (data,bizParms) {
			let template = require('views/news/common/news_li.jade');
			let html = template({data});
			return template({data})

		},
		initData:function () {
			console.log("initData:")
		},
		renderDomComplete:function () {
			console.log("222222");
			$(".list img").lazyload({
				effect: "fadeIn"
			});
			// mallCom.lazyload({el:'.list-box',rate:1});
		}
	});
})