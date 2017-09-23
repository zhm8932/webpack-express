/**
 * Created by haiming.zeng on 2017/9/18.
 */
const path = require('path');
const ROOT = path.resolve(__dirname,'..');
const SRC_PATH = path.join(ROOT,'src');
const PUBLIC_PATH = path.join(ROOT,'public');
const publicPath = 'http://localhost:4000/';

module.exports = {
	ROOT,
	SRC_PATH,
	PUBLIC_PATH,
	publicPath,

}