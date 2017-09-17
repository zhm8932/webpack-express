/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ROOT = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT,'src');
const publicPath = '/';
const webpackConfig = require('./webpack.config');
module.exports = merge(webpackConfig,{
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:ExtractTextPlugin.extract({  //开发环境分离css时，热更新无效
					fallback:'style-loader',
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
				}),
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css',{
			allChunks : true
		}),
		// new webpack.HotModuleReplacementPlugin(), // 启用 HMR
		new webpack.NoEmitOnErrorsPlugin()
	],
})