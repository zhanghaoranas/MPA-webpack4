const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.base.js');
const path = require('path');
const fs = require('fs');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
// 由于设置了环境变量所以 导出的是一个函数而不是一个对象。

module.exports = smp.wrap((env) => {
	console.log(env);
	return merge(common, {
		devtool: 'inline-source-map',
		mode: 'development',
		devServer: {
			contentBase: path.join(__dirname, '../dist'),
			compress: true,
			open: true,
			disableHostCheck: true,
			hot: true,
		},
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					// exclude: /node_modules/,
					use: [
						'vue-style-loader',
						'css-loader',
						'postcss-loader',
						{
							loader: 'sass-loader',
							options: {
								data: fs.readFileSync(path.join(__dirname, '../src/assets/common/common.scss')),
							},
						},
					],
				},
				{
					test: /\.less$/,
					use: ['vue-style-loader', 'css-loader', 'less-loader'],
				},
			],
		},
		plugins: [new webpack.HotModuleReplacementPlugin()],
	});
});
