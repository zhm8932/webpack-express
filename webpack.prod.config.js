/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig,{
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:ExtractTextPlugin.extract({  //开发环境分离css时，热更新无效
					fallback:'style-loader',
					use: [{
						loader: "css-loader",
						options: {
							minimize: true // css压缩
						}
					}, {
						loader: "sass-loader"
					}],
				}),
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		// 若要按需加载 CSS 则请注释掉该行
		new ExtractTextPlugin('css/[name].css',{
			allChunks : true
		}),
		// new webpack.NoErrorsPlugin(),	//不显示错误插件
		new webpack.optimize.UglifyJsPlugin({
			mangle:{ //不混淆压缩
				except:['$','exports','require'],
				screw_ie8: true,
				keep_fnames: true
			},
			compress:{
				warnings:false,
				screw_ie8: true
			},
			beautify: false,
			comments: false
		}),
		new CleanWebpackPlugin(
			['public/js','public/css'],　 //匹配删除的文件
			{
				root: __dirname,       　　　　　　　　　　//根目录
				verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
				dry:      false,        　　　　　　　　　　//启用删除文件
				exclude: ["vendors.js","vendors.manifest.json"] //排除不删除的目录，主要用于避免删除公用的文件
			}
		)
	],
})