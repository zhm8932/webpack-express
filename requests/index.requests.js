/**
 * Created by haiming.zeng on 2017/9/19.
 */
const apiPath = require('../utils/apiPath');
const proxy = require('../utils/proxy');
const Tools = require('../utils/tools');
const config = require('../config');

exports.get_jops_list = function (req,res,next) {
	var body = req.body;
	var query = req.query;
	var data = {
		account:"",
		currentPage:query.page||body.page||config.pageNo,
		jobType:body.jobType||"",
		pageNumber:config.pageSize/5,
		positionName:"",
		recType:"1",
		roleCode:"PERSONAL",
		workSplace:""
	}
	proxy(req,res,{
		method:'POST',
		path:"WSGetDemandListFacade/getDemandList",
		apiType: config.apiType.services,
		data:data
	}).then(function (json) {
		if(Tools.isAjax(req)){
			return res.send(json)
		}
		res.locals.data = json.data
		res.locals.pageCount = Math.ceil(json.count/json.pageNumber);
		res.locals.currentPage = json.currentPage;
		res.locals.count = json.count;

		next();
	}).catch(function (err) {
		next()
	})

	// next();
}
exports.get_jops_position = function (req,res,next) {
	proxy(req,res,{
		method:'POST',
		path:"WSGetDemandBasicsFacade/getDemandBasics",
		apiType: config.apiType.services,
	}).then(function (json) {
		res.locals.position = json.data;
		next();
	}).catch(function (err) {
		next()
	})
}