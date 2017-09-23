var express = require('express');
var router = express.Router();
var Handlers = require('../handlers/news.handlers');
var Requests = require('../requests/news.requests');

router.get('/',Handlers.index);
router.get('/list(/:type)?',Requests.get_good_list, Handlers.list);
router.get('/article/:id', Handlers.article);

module.exports = router;
