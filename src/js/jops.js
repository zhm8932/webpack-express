/**
 * Created by haiming.zeng on 2017/9/20.
 */
import '../sass/jops.scss';
import * as utils from './libs/utils'
$(function () {

	$('.select-box').select();
	let $jopList = $('.jop-list');
	$jopList.on('click','.tbody dt',function () {
		$(this).addClass('on');
		$(this).next().slideToggle();
	})

	let $position = $('.position');
	let $tbody = $('.tbody');
	$position.on('click','span',function () {
		$(this).addClass('on').siblings().removeClass('on');
		let jobType =  $(this).data('jobtype');
		let data = {
			jobType
		}
		console.log("data:",data)

		getJopList(data);
	})

	$tbody.on('click','.pagination a',function (e) {
		e.preventDefault();
		let page = $(this).data('page');
		console.log("page:",page)
		let data = {
			jobType:$position.find('on').data('jobtype'),
			page
		}
		getJopList(data)

	})

	function getJopList(data) {
		utils.ajax({
			method:'POST',
			url:'/getJopList',
			data,
			beforeSend(){
				utils.isLoadings({ele:'.tbody'});
				$tbody.html('')
			}
		}).then(function (json) {
			utils.isLoadings({ele:'.tbody',show:false});
			let template = require('views/jops/common/jop_list');
			let pageCount = Math.ceil(json.count/json.pageNumber);
			let currentPage = json.currentPage;
			json.pageCount = pageCount;
			$tbody.html(template(json)).attr('data-pageCount',pageCount)
		})
	}

	$tbody.on('change','.pageNo',function () {
		let page = $(this).val();
		console.log("page:",page)
	})

})