module.exports = {
	plugins: {
		cssnano: {
			preset: 'default',
		},
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 750,
			unitPrecision: 5,
			propList: ['*'],
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			exclude: [],
			landscape: false,
			landscapeUnit: 'vw',
			landscapeWidth: 1334,
		},
	},
};

// 下面是 postcss8的写法，但是 postcss-px-to-viewport 暂时不支持

// module.exports = {
//     plugins: [
//         require('cssnano')({
//             preset: 'default',
//         }),
//     ],
// };
