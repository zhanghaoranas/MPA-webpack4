import { parse, ParsedQuery } from 'query-string';
import { env, localToken } from '../config'

interface UserInfo {
	user_role: number;
	user_name: string | null;
	user_id: number | null;
	user_dept_id: number | null;
	user_dept: string | null;
	access_token: string | null;
}

/**
 * 得到token
 */
function getToken(): string | null {
	if (env === 2) {
		return localToken
	} else {
		const token = sessionStorage.getItem('token');
		if (token) {
			return token;
		} else {
			throw Error('dont get Token please check');
		}
	}

}

/**
 * 获取用户当前的设备（当前只判断了iPhone没有判断iPad）
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
function getUserInfo(): UserInfo | undefined {
	if (env === 2) {
		return {
			user_role: 4,
			user_name: null,
			user_id: null,
			user_dept_id: null,
			user_dept: null,
			access_token: getToken(),
		}
	} else {
		if (isIOS()) {

		} else {
			// 是否在真机运行
			if (typeof salesApp === 'undefined') {
				const userInfo: UserInfo = JSON.parse(salesApp.getUserInfo())
				sessionStorage.setItem('token', userInfo.access_token as string);
				return userInfo;
			}
		}

	}
}



/**
 * 获取url中的参数
 */

const getQueryStringForUrl = (() => {
	const parsed = parse(location.search);
	// 函数的重载 （查一下匿名函数如何重载）
	function getQuery(): ParsedQuery;
	function getQuery(keys: string): string; // undifind 为 string 的子类型
	function getQuery(keys: string[]): ParsedQuery;
	function getQuery(keys?: string | string[]): string | ParsedQuery {
		if (typeof keys === 'string') {
			return parsed[keys] as string;
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
	return getQuery
})();



export { getToken, isIOS, getUserInfo, getQueryStringForUrl, };
