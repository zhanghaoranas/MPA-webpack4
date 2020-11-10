


/**
 * 环境 分为正式环境 0， 测试环境 1， 开发环境2.
 * 
 */


const env = ((): number => {
	const run = process.env.run;
	return run === 'server' ? 0 : run === 'local' ? 1 : 2;
})();

/**
 * @description 项目的baseUrl。
 */
const baseUrl = (function () {
	const prodUrl = 'http://sumsale.tygps.com/'; // 正式服务器
	const localUrl = 'https://sales.sscm-cn.com/tymics_sale013/'; // 测试服务器
	const devUrl = 'http://192.168.18.70:8081/tymics_sale013/'; // 本地服务

	return env === 0 ? prodUrl : env === 1 ? localUrl : devUrl;
})();

/**
 * @description 本地token;
 */
const localToken = ''




export { env, baseUrl, localToken };
