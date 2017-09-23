/**
 * Created by haiming.zeng on 2017/9/21.
 */
const config = require('../config');
const request = require('request');
const tools = require('./tools');

const proxy = function (req,res,opts) {
	return new Promise(function (resolve,reject) {
		// logger.info("opts:",JSON.stringify(opts));
		let method = opts && opts.method && opts.method.toUpperCase() || 'GET';
		let data = opts && opts.data || {};
		let {hostname,port,protocol,v} = config;
		let apiType = opts.apiType ? opts.apiType : config.apiType.msapi;
		let	path = `/${apiType}/${v}/${opts.path}`;

		if(opts.apiType=='webservices'){
			protocol = 'https';
			path =`/${apiType}/${opts.path}`;
			hostname = config.hostnameMsxf;
		}else if(opts.apiType=='douban'){
			protocol = 'https';
			path = `/${v}/${opts.path}`;
		}

		let uri = `${protocol}://${hostname}:${port}${path}`;
		if(port=='80'){
			uri = `${protocol}://${hostname}${path}`;
		}
		let options = {
			uri: uri,
			method: method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				'X-Application-Id': config.XApplicationId,
				'X-API-Version': config.XAPIVersion,
				'X-Token': config.XToken,
				'X-Client': config.XClient,
			}
		};
		logger.info("opts2:",JSON.stringify(opts));
		request(options,function (error,response,body) {
			logger.info(uri,":---resbody:",body)
			var resObj = null;
			if(error){
				console.log("error:",JSON.stringify(error))
				reject(error);
			}
			try {
				if(/^\d*$/.test(body)||/<html>/.test(body)){
					console.log("文本内容：",body);
					resObj = body
				}else{
					if(body){
						resObj =  JSON.parse(body);
					}
				}

			}catch (err){
				console.log("err:",err)
			}
			resolve(resObj);
		})

	})
}

module.exports = proxy