/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const webpack = require('webpack');
const ROOT = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT,'src');
const publicPath = 'http://localhost:4000/';
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig,{
	devtool: 'source-map',
	module: {
		rules:[
			{
				test:/\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // 启用 HMR
		new webpack.NoEmitOnErrorsPlugin()  //编译出现错误时,跳过该阶段
	],
	devServer:{
		proxy:{
			'*':'http://localhost:3000'
		},
		contentBase: [path.join(ROOT, 'public')],        //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录，告诉服务器从哪里提供内容
		inline:true,    //设置为true，当源文件改变时会自动刷新页面
		stats: { colors: true },  //设置为true，使终端输出的文件为彩色的
		hot:true,       // 告诉 dev-server 我们在使用 HMR 启用 webpack 的模块热替换特性
		port:4000,      //  port:默认为8080
		compress: true, //启用gzip 压缩
		publicPath:publicPath, //此路径下的打包文件可在浏览器中访问 模块热替换所必需的
		historyApiFallback:true  //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	},
})