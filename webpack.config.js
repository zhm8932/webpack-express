/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const webpack = require('webpack');
const ROOT = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT,'src');
const publicPath = 'http://localhost:4000/';
module.exports = {
	entry:{
		// vendors:['jquery','react','react-dom'],
		index:path.join(SRC_PATH,'js/index.js'),
		users:path.join(SRC_PATH,'js/users.js'),
		about:path.join(SRC_PATH,'js/about.js'),
	},
	output: {
		path: path.join(ROOT,'public'),
		filename: "js/[name].js",
		publicPath:publicPath
	},
	// devtool: 'source-map',
	// devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js','.jsx','.json','.scss'],
		alias:{
			libs:path.join(SRC_PATH,'js/libs'),
			sass:path.join(SRC_PATH,'sass'),
		}
	},
	module: {
		rules:[
			{
				test:/\.jsx?$/,
				use:'babel-loader',
				exclude:/node_modules/
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				include:/src/,
				use:{
					loader: 'url-loader',
					options: {
						limit:1024*8,
						name: './fonts/[name].[ext]',
					},
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include:/src/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024*16,  //当图片大小小于限制时会自动转成 base64 码引用
							name:'./images/[name].[ext]',
							prefix: 'img'
						},

					}
				]

			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			'React':'react',
			'ReactDOM':'react-dom',
		}),
		new webpack.optimize.CommonsChunkPlugin({name:'common',minChunks:3}), //模块必须被3个才会共享
		new webpack.DllReferencePlugin({
			context:__dirname,  //context：需要跟之前保持一致，这个用来指导webpack匹配manifest.json中库的路径
			manifest:require('./public/vendors.manifest.json') //用来引入刚才输出的manifest.json文件
		}),
	]
}