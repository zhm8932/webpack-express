/**
 * Created by haiming.zeng on 2017/9/19.
 */

exports.index = function (req,res,next) {
	res.render('index', { title: '深圳市明日科技咨询责任有限公司' });
}

exports.abouts = function (req,res,next) {
	res.render('abouts', { title: '明日简介' });
}

exports.jops = function (req,res,next) {
	res.render('jops/jops', { title: '诚聘英才' });
}

exports.contacts = function (req,res,next) {
	res.render('contacts', { title: '联系我们' });
}