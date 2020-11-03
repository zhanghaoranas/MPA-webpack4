/**
 * @description 项目的全局设置。
 */

const baseUrl = (function () {
	const prodUrl = 'http://sumsale.tygps.com'; // 正式服务器
	const localUrl = 'https://sales.sscm-cn.com/tymics_sale013'; // 测试服务器
	const devUrl = 'http://192.168.18.70:8081/tymics_sale013'; // 本地服务

	const run = process.env.run;

	return run === 'server' ? prodUrl : run === 'local' ? localUrl : devUrl;
})();

export {baseUrl};
