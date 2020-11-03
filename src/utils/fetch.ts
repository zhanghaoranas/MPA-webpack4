import axios, {AxiosRequestConfig, Method} from 'axios';
import * as qs from 'qs';
import {baseUrl} from '../config/index';
import {getToken} from '../utils/index';

type CustomConfig = Omit<AxiosRequestConfig, 'url' | 'method'>;

// 生成axios 实例 保证axios的纯洁
const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 30 * 1000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		config.headers['X-Access-Token'] = getToken();
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
	function (response) {
		return response.data;
	},
	function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

/**
 * config 中如果存在 url 或 method 则覆盖预设的 url和methods , 需要优化。
 * @param type
 */
const createAxios = (type: Method) => (url: string, data = {}, config: CustomConfig = {}) => {
	const baseConfig: AxiosRequestConfig = {
		url,
		method: type,
		...config,
	};
	let params;

	// if (config.headers && config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
	// 使用 ?. （可选链）语法可以简化上面的写法。

	if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
		params = qs.stringify(data);
	} else {
		params = data;
	}
	switch (type) {
		case 'get':
			baseConfig.params = params;
			break;
		default:
			baseConfig.data = params;
	}
	return axiosInstance(baseConfig);
};

// 暂时生成 post/get 两种请求方法, 以及一个可以自定义的方法。
const fetchPost = createAxios('post');
const fetchGet = createAxios('get');
const fetch = (config: AxiosRequestConfig) => {
	return axiosInstance(config);
};

export {fetchGet, fetchPost, fetch};
