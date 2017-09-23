const path = require('path');

var logPath = process.env.LOG_PATH || path.resolve(__dirname,'../logs');

module.exports  = {
	appenders: [
		{ type: 'console' },    // 控制台输出
		{
			type: 'file',       // 单文件输出
			category: 'info',   // 记录器名
			layout: {                       // (optional) the layout to use for messages
				type: "pattern",
				// "pattern": "%d[%r () %p %c -%] %m%n",
				// "pattern": "%d %m%n",
				pattern: "%d [%p] %c - %m",
			},
			filename: path.join(logPath, './log.log'),
			maxLogSize: 10*1024*1024, // = 10Mb
			backups: 100    // 日志备份数量，大于该数则自动删除
		} ,
		{  // 日期格式文件输出
			"type": "dateFile",
			// "filename": 'logs/error.log',
			"filename": path.resolve(logPath, "./error"),
			"category": "error",
			layout: {                       // (optional) the layout to use for messages
				type: "pattern",
				pattern: "%d [%p] %c - %m",
			},
			// "pattern": "-yyyy-MM-dd",
			pattern: "-yyyy-MM-dd.log",
			alwaysIncludePattern:true,
		},
		{  // 日期格式文件输出
			"type": "dateFile",
			"filename": path.resolve(logPath, "./warn"),
			layout: {                       // (optional) the layout to use for messages
				type: "pattern",
				pattern: "%d [%p] %c - %m",
			},
			"category": "warn",         // 日志文件名，可以设置相对路径或绝对路径
			pattern: "-yyyy-MM-dd.log", // 占位符，紧跟在filename后面
			alwaysIncludePattern:true,  // 文件名是否始终包含占位符
		}
	],
	replaceConsole: true,   //替换console.log
	"levels": [{
		"trace": "TRACE",
		"debug": "DEBUG",
		"info": "INFO",
		// "warn": "INFO",
		"warn": "WARN",
		"error": "ERROR",
		'fatal': 'FATAL'
	}]
};

