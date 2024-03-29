// 引入axios
import axios from "axios";
// 配置axios, 设置content-type
axios.defaults.headers.post["Content-Type"] = "application/json";
// 配置axios, 基础路径
axios.defaults.baseURL = "https://www.fastmock.site/mock/ca407904987fe549265c9988da50a76c/shop";
// 定义post方法, url: 请求地址, data: 请求参数

/**
 * ajax请求函数模块, post
 * @param {string} url 请求的路径
 * @param {object} data 携带的参数, 格式是object
 * @returns {Promise} 返回一个promise对象, 包含响应的data数据
 */
const post = (url, data = {}) => {
	// 返回一个promise对象
	return new Promise((resolve, reject) => {
		// 调用axios的post方法, 传入url和data
		axios.post(url, data).then(
			(response) => {
				// 成功时调用resolve
				resolve(response.data);
			},
			(error) => {
				// 失败时调用reject
				reject(error);
			}
		);
	});
};

/**
 * ajax请求函数模块, get
 * @param {string} url 请求的路径
 * @param {object} params 携带的参数, 格式是object
 * @returns {Promise} 返回一个promise对象, 包含响应的data数据
 */
const get = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url, { params })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

/**
 * ajax请求函数模块, put
 * @param {string} url 请求的路径
 * @param {object} data 携带的参数, 格式是object
 * @returns {Promise} 返回一个promise对象, 包含响应的data数据
 */
const put = (url, data = {}) => {
	// 返回一个promise对象
	return new Promise((resolve, reject) => {
		// 调用axios的put方法, 传入url和data
		axios.put(url, data).then(
			(response) => {
				// 成功时调用resolve
				resolve(response.data);
			},
			(error) => {
				// 失败时调用reject
				reject(error);
			}
		);
	});
};

// 导出post方法
export { post, get, put };