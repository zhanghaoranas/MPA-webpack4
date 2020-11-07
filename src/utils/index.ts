import { parse, ParsedQuery } from 'query-string';


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
function getENV() { }

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
 * 获取用户的当前设备是否为ios
 */
function isIOS(): boolean {
	return getUserAgent() === 'IOS';
}

/**
 * 获取当前用户的信息
 * 
 */
function getUserInfo() {
	if (isIOS()) {

	} else {
		// 是否在真机运行
		if (typeof salesApp === 'undefined') {
			return JSON.parse(salesApp.getUserInfo())
		} else {
			return {
				userRole: 4,
				userName: null,
				userId: null,
				userDeptId: null,
				userDept: null,
				accessToken: getToken(),
			}
		}
	}
}


const getQueryStringForUrl = (() => {
	const parsed = parse(location.search);
	return (keys: string | string[] | null) => {
		if (typeof keys === 'string') {
			return parsed[keys] as string | null;
		} else if (Array.isArray(keys)) {
			const queryString: ParsedQuery = {};
			keys.forEach(key => {
				queryString[key] = parsed[key]
			})
			return queryString
		} else {
			return parsed;
		}
	}
})();
export { getToken, getENV, isIPhone, getUserInfo, getQueryStringForUrl };
