/**
 * Created by XuedaoYuan on 2018/11/9 下午12:29.
 */
import axios from 'axios'

axios.defaults.timeout = 15000
axios.defaults.retry = 3
axios.defaults.retryDelay = 2000

function axiosRetryInterceptor(err) {
	var config = err.config

	// If config does not exist or the retry option is not set, reject
	if (!config || !config.retry) return Promise.reject(err)

	// Set the variable for keeping track of the retry count
	config.__retryCount = config.__retryCount || 0

	// Check if we've maxed out the total number of retries
	if (config.__retryCount >= config.retry) {
		// Reject with the error
		return Promise.reject(err)
	}

	// Increase the retry count
	config.__retryCount += 1

	// Create new promise to handle exponential backoff
	var backoff = new Promise(function(resolve) {
		setTimeout(function() {
			resolve()
		}, config.retryDelay || 1)
	})

	// Return the promise in which recalls axios to retry the request
	return backoff.then(function() {
		return axios(config)
	})
}

axios.interceptors.request.use(
	function(config) {
		config.url = '/tmall' + config.url
		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// axios.interceptors.response.use(res => res.data, err => Promise.reject(err))
axios.interceptors.response.use(res => {
	if (!res.data.success) {
		console.log('请求出错')
	}

	return res.data
}, axiosRetryInterceptor)

export default axios
