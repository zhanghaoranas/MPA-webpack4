const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 在webpack5中内置，不需要再安装

const {
	VueLoaderPlugin
} = require('vue-loader');

/**
 *
 * @description basePath下js/ts文件的路径， 如果存在name 则获取文件名为name的文件
 * @param {string} basePath
 * @param {string} name
 * @param {'js' | 'ts'} ext 当有重复name时使用那个作为入口文件
 */
function getFileDir(basePath, name, ext = 'js') {
	const fileName = name ? `{name}.*s` : '*.*s';
	const fileDir = glob.sync(basePath + '**/' + fileName);
	if (fileDir.length == 0) {
		throw Error(basePath + '路径下没有js文件,请检查');
	}
	// 检测是否有name 相同但后缀名不同的文件 如 a.js 和 a.ts
	const fileDirObj = {};
	console.log(fileDir);
	const fileDirNoEXT = fileDir.map((item) => {
		return item.replace(/\.(j|t)s$/, '');
	});
	console.log(fileDirNoEXT);
	fileDirNoEXT.forEach((item) => {
		if (fileDirObj[item]) {
			fileDirObj[item] = fileDirObj[item] + 1;
		} else {
			fileDirObj[item] = 1;
		}
	});
	const repeatDir = [];

	for (let [key, value] of Object.entries(fileDirObj)) {
		if (value > 1) {
			repeatDir.push(key + '.' + ext);
		}
	}
	console.log(repeatDir);
	if (repeatDir.length > 0) {
		return fileDir.filter((item) => {
			!repeatDir.includes(item);
		});
	} else {
		return fileDir;
	}
}
/**
 *
 * @param {*} basePath
 * @param {*} entryFileDir
 * @description 获取路径映射
 */
function getDirMap(basePath, entryFileDir) {
	const dirMap = {};
	entryFileDir.forEach((item, index) => {
		const dir = item.replace(basePath, '').split('/');
		dir.pop();
		dirMap[dir.join('/')] = getPath('.' + item);
	});
	return dirMap;
}

/**
 *
 * @param {string} j entry对象的key.
 * @returns {string} template.
 * @description 如果目录中存在模板则使用目录中的模板否则使用通用模板。
 */
function getHTMLTemplate(i) {
	const template = glob.sync(`./src/views/${i}/*.html`)[0];
	if (!template) {
		return glob.sync('./src/template/index.html')[0];
	}
	return template;
}
/**
 *
 * @param {*} routeName
 * @description 生成 HtmlWebpackPlugin
 */
function createHtmLWebpackPlugin(dirFragment) {
	return dirFragment.map(
		(i) =>
		new HtmlWebpackPlugin({
			filename: `${i}.html`,
			template: getHTMLTemplate(i),
			inject: true,
			chunks: [i, 'venders'],
		})
	);
}

function getPath(pathStr) {
	return path.resolve(__dirname, pathStr);
}

// 基础路径 通过更改basePath 可以进行部分模块编译， 优化编译速度
let basePath = './src/views/';
const entryFileDir = getFileDir(basePath);
console.log(entryFileDir);
const dirMap = getDirMap(basePath, entryFileDir);
const dirFragment = Object.keys(dirMap);

// webpack 基础配置
const webpackBaseConf = {
	entry: dirMap,
	output: {
		filename: 'js/[name].js',
		path: getPath('../dist'),
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.ts$/,
				include: getPath('../src'),
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: 'vant',
								libraryDirectory: 'es',
								// 这句必须加上，不然修改主题没有效果
								style: (name) => `${name}/style/less`,
							}),
						],
					}),
				},
			},
			{
				test: /\.js$/,
				include: getPath('../src'),
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				include: getPath('../src'),
				use: {
					loader: 'url-loader',
					options: {
						limit: '8197',
					},
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		...createHtmLWebpackPlugin(dirFragment),
		// 这插件不更新 可能会替换掉 先注释
		// new AddAssetHtmlPlugin({
		// 	filepath: require.resolve('normalize.css'),
		// 	outputPath: 'css/',
		// 	publicPath: '/css',
		// 	typeOfAsset: 'css',
		// }),
	],
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: {
			'@': getPath('../src'),
			common: getPath('../src/assets/common'),
			images: getPath('../src/assets/images'),
			json: getPath('../src/assets/json'),
			fonts: getPath('../src/assets/fonts'),
		},
	},
	stats: 'errors-only',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
			}),
		],
		splitChunks: {
			name: 'venders',
			chunks: 'all',
		},
	},
};

module.exports = webpackBaseConf;