/**
 * Created by haiming.zeng on 2017/9/18.
 */
"use strict";

import 'sass/globals.scss';
import 'jquery.cookie';
import './libs/lazyload';
$(function () {
	//菜单
	function handlerNav() {
		let {pathname} = window.location;
		// console.log("pathname:",pathname)
		var $nav_A = $('.nav a');
		var href = '';
		$.each($nav_A, function (index, arr) {
			href = $(arr).attr('href');
			if (pathname.search(href) != -1) {
				$(arr).addClass('on').siblings().removeClass('on')
			}
		});
	}
	handlerNav();

	$("section img,.lazy").lazyload({
		effect: "fadeIn"
	});

	serviceWorker();
	function serviceWorker() {
		if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}).catch(function (err) {
          console.log('ServiceWorker registration failed: ', err);
		});
		}
	}
})
console.log("公共页面JS")