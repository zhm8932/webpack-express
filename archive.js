/**
 * Created by haiming.zeng on 2017/9/24.
 */
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const moment = require("moment");
const pkg = require('./package.json');
const config = require('./config');

let date = moment().format("YYYYMMDDhhmmss");
// 构建名称
const archiverFileName = path.join(__dirname,config.name||pkg.name+'-'+pkg.version+'-'+date+".zip");
// console.log("archiverFileName:",archiverFileName)
//文件打包输出流

let output = fs.createWriteStream(archiverFileName);

//生产archiver对象，打包成zip
let archive = archiver('zip',{
	zlib: { level: 9 } // Sets the compression level.
});
output.on('close', function() {
	console.log("文件打包完成");
	console.log(archive.pointer() + ' total bytes',bytesToSize(archive.pointer()));
	console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.on('error', function(err) {
	throw err;
});

archive.pipe(output);

let zipList = ['app.js','package.json','.babelrc','bin', 'config','handlers','requests','routes','views','utils','public', 'node_modules'];

zipList.forEach(function (file) {
	// console.log(file,":",fs.statSync(file).isDirectory())
	if(fs.statSync(file).isDirectory()){
		archive.directory(file);
	}else {
		archive.file(file)
	}
})
// archive.directory('views/');
// archive.file('app.js');
// archive.file('package.json');
// archive.directory('config');
// let zipList = ['app.js','package.json','.babelrc','bin/**'];

archive.finalize();

console.log('打包路径：%s', archiverFileName);

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};