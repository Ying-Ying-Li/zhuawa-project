const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: __dirname + '/src/index.js',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	output: {
		path: __dirname + '/dist/',
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
		new webpack.HotModuleReplacementPlugin(),  // 替换插件
		// 每次构建前清理dist文件夹
		new CleanWebpackPlugin(),
		// html-webpack-plugin插件默认生成index.html文件
		new HtmlWebpackPlugin({
		  	title: '今日头条',
		  	filename: 'index.html',
      		template: 'index.html'
		})
	],
};