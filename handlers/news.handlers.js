/**
 * Created by haiming.zeng on 2017/9/19.
 */

exports.index = function (req,res,next) {
	res.render('news/index', {
		title: '企业动态'
	});
}
exports.list = function (req,res,next) {
	var type = req.params.type;
	console.log("type:",type)
	res.render('news/list', {
		title: '企业动态'
	});
}
exports.article = function (req,res,next) {
	var id = req.params.id;
	console.log("id:",id)
	res.render('news/article', {
		title: '企业动态详情'
	});
}