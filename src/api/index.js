import axios from '../plugins/axios'

export function getCategoryList(params) {
	return axios({
		url: '/category-list',
		method: 'GET',
		params
	})
}
