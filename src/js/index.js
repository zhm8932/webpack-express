/**
 * Created by 91608 on 2017/9/17.
 */
import '../sass/index.scss';
//
import * as utils from './libs/utils';
import 'slides';
$(function () {
	$.cookie('phone','13688889999');
	let phone = $.cookie('phone');
	console.log("phone:",phone)

	function initTouchSlider({width,height}) {
		$('.banner').slidesjs({
			width: width,
			height: height,
			navigation: false,
			play: {
				active: false,
				auto: true,
				interval: 6000,
				swap: true
			},
			effect: {
				slide: {
					speed: 1000
				}
			}

		});
	}
	initTouchSlider({width:1920,height:678})

	$('.advantage').on('mouseover','.hd span',function () {
		let index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on')
		$('.advantage').find('.bd p').eq(index).fadeIn().siblings().hide();
	})
})