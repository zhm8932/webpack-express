/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const Tools = require('../utils/tools');
const config = require('../config');

exports.get_good_list = function (req,res,next) {

	var query = req.query;
	query.type = query.type?query.type:'0';

	var data = {
		pageNo:query.pageNo||config.pageNo,
		pageSize:config.pageSize-1,
		catId:query.typeCode||'',
		cityCode:query.code||'',
		latitude:'',
		longitude:'',

		compId:query.compId||'',
		flagType:query.flagType||'',
		goodsName:query.goodsName||'',
		sortType:query.sortType||'0',
	};
	// console.log("query:",query)
	res.locals.query = query;
	proxy(req,res,{
		method:'GET',
		path:"movie/in_theaters",
		apiType: config.apiType.douban,
		bQuery:true,
		data:data
	}).then(function (json) {
		if(Tools.isAjax(req)){
			return res.send(json);
		}
		let pageCount = Math.ceil(json.totalCount/data.pageSize);
		var success=json&&!json.code?true:false;
		res.locals.pageCount = pageCount;
		console.log("data",json.data);
		res.locals.data = json.subjects;
		res.locals.success = success
		if(!success){
			res.locals.goodsList = json;
		}
		next()
	}).catch(function (err) {
		next()
	})


}