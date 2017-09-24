/**
 * Created by 91608 on 2017/9/17.
 */
import * as utils from 'libs/utils';
import '../../sass/abouts.scss';

$(function () {
	let $introduce = $('.introduce');
	let $tit = $('.tit');
	let $body = $('body');

	$introduce.on('mouseover','.hd span',function () {
		$(this).addClass('on').siblings().removeClass('on')
		let index = $(this).index();
		$introduce.find('.bd aside').eq(index).show().siblings().hide();

	});
	let topHeight = $('.ads').outerHeight(true)+$('.header').outerHeight(true);
	let titHeight = $tit.height();
	let $header = $('.about').find('header');
	$tit.on('click','span',function () {
		$(this).addClass('on').siblings().removeClass('on');
		let curType = $(this).data('type');
		let offsetTop = '';

		console.log("titHeight:",titHeight)
		console.log("curType:",curType)
		$.each($header,function (index,item) {
			let id = $(item).attr('id');
			console.log("id:",id)
			if(id==curType){
				offsetTop = $(item).offset().top;
				console.log("offsetTop:",offsetTop)
			}
		})
		$('body').scrollTop(offsetTop-titHeight/2);
	})

	$(window).scroll(function () {
		let scrollTop = $body.scrollTop();
		// console.log("scrollTop:",scrollTop)
		if(scrollTop>topHeight){
			$tit.addClass('fixed')
			$header.each((index,item)=>{
				let itemOffsetTop = $(item).offset().top;
				// console.log("itemOffsetTop：",itemOffsetTop)
				let id = $(item).attr('id');
				if(scrollTop>=itemOffsetTop-titHeight){
					$tit.find('span[data-type='+id+']').addClass('on').siblings().removeClass('on');
				}
			})
		}else{
			$tit.removeClass('fixed')
		}
	})
})