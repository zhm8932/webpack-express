var express = require('express');
var router = express.Router();
var Handlers = require('../handlers/indexs.handlers');
var Requests = require('../requests/index.requests');

/* GET home page. */
router.use(function (req,res,next) {
	logger.info("originalUrl:",req.originalUrl,JSON.stringify(req.body));

	next();
})

router.get('/', Handlers.index);
router.get('/abouts', Handlers.abouts);
router.get('/jops',Requests.get_jops_position,Requests.get_jops_list,Handlers.jops);

router.post('/getJopList',Requests.get_jops_list);

router.get('/contacts', Handlers.contacts);

router.get('/test', function(req, res, next) {
	res.render('test', { title: '测试页面' });
});

module.exports = router;
