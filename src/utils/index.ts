/**
 * 得到token
 */
function getToken(): string | null {
	const token = sessionStorage.getItem('token');
	if (token) {
		return token;
	} else {
		throw Error('dont get Token please check');
	}
}

/**
 * 环境 分为正式环境 0， 安卓测试环境 1， ios 开发环境2， web开发3.
 * 此处的正式环境不是 yarn build 时的环境
 */
function getENV() {}

/**
 * 获取用户当前的设备（当前只判断了iPhone 为）
 */
function getUserAgent() {
	const userAgent = navigator.userAgent;
	if (userAgent.indexOf('iPhone') > -1) {
		return 'IOS';
	} else if (userAgent.indexOf('Android') > -1) {
		return 'Android';
	} else {
		return 'Web';
	}
}

/**
 * 获取用户的当前设备是否为iphone
 */
function isIPhone(): boolean {
	return getUserAgent() === 'IOS';
}

/**
 * 获取当前用户的信息
 */
function getUserInfo() {}

export {getToken, getENV, isIPhone, getUserInfo};
