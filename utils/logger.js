/**
 * Created by haiming.zeng on 16/9/19.
 */
"use strict";

const fs = require('fs');
const log4js = require('log4js');
const path = require('path');

const JSON_PATH = require('./log4js.config');
const LOG_DIR = path.resolve(__dirname, '../logs');
const logPath = process.env.LOG_PATH || LOG_DIR;
class Log {
    constructor() {
        //加载log4js配置
        if(!fs.existsSync(logPath)) {
            fs.mkdirSync(logPath);
        }
        this._defaults = {};
        log4js.configure(JSON_PATH);
    }

    getLogger(name) {
        let _default = this._defaults;
        if(!name) {
            return this;
        }else{
            let logger = _default[name];
            if(!logger) {
                logger = log4js.getLogger(name);
            }
            return logger;
        }
    }

    connectLogger(name) {
        //页面请求日志, level用auto时,默认级别是WARN
        return log4js.connectLogger(this.getLogger(name), { level: 'auto' });
    }

}

var instance = new Log();
module.exports = instance;
