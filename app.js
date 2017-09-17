var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

console.log("app.get('env'):",app.get('env'))
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/about', about);

if ('development' === app.get('env')) {
	var webpack = require('webpack');
	var webpackDevMiddleware = require("webpack-dev-middleware");
	var webpackHotMiddleware = require('webpack-hot-middleware');

	var webpackConfig = require('./webpack.config');
	var compiler = webpack(webpackConfig);

	app.use(webpackDevMiddleware(compiler,{
		noInfo:true,  //false将打印编译信息（建议true，false会打印很多信息）
		public:webpackConfig.output.publicPath //绑定middleware
	}));

	app.use(webpackHotMiddleware(compiler));

	app.set('showStackError', true);
	app.locals.pretty = true;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
