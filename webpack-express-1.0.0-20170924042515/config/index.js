/**
 * Created by haiming.zeng on 2017/9/21.
 */
/*
* 环境配置
* */
const fs = require('fs');
let env = process.env.NODE_ENV || 'development';

let CFG_PATH = process.env.CFG_PATH || '';
let config = require('./config.common');
let myconfig = '';
console.log("env:",env);
try {
	if(CFG_PATH){
		myconfig = require(CFG_PATH)
	}else {
		myconfig = require('./development')
	}
}catch(err) {
	console.error('Cannot load config: [%s] %s', env);
	throw err;
}

console.log("myconfig:",JSON.stringify(myconfig));

Object.assign(config,myconfig);
console.log("config:",JSON.stringify(config))

module.exports = config;