import axios from '../plugins/axios'

export function getCategoryList(params) {
	return axios({
		url: '/category-list',
		method: 'GET',
		params
	})
}

export function getCategory(id) {
	return axios({
		url: '/category',
		method: 'GET',
		params: {
			id
		}
	})
}

export function saveCategory(data) {
	return axios({
		url: '/category',
		method: 'POST',
		data
	})
}

export function updateCategory(data) {
	return axios({
		url: '/category',
		method: 'PUT',
		data
	})
}

export function deleteCategory(id) {
	return axios({
		url: '/category',
		method: 'delete',
		params: {
			id
		}
	})
}

export function getPropertyByCid(cid) {
	return axios({
		url: '/propertyList',
		method: 'GET',
		params: {
			cid
		}
	})
}

export function addProperty(data) {
	return axios({
		url: '/property',
		method: 'POST',
		data
	})
}
export function updateProperty(data) {
	return axios({
		url: '/property',
		method: 'PUT',
		data
	})
}

export function getPropertyById(id) {
	return axios({
		url: '/property-id',
		method: 'GET',
		params: {
			id
		}
	})
}

export function deletePropertyById(id) {
	return axios({
		url: '/property',
		method: 'DELETE',
		params: {
			id
		}
	})
}

export function getProductByCid(cid) {
	return axios({
		url: '/product-cid',
		method: 'GET',
		params: {
			cid
		}
	})
}

export function addProduct(data) {
	return axios({
		url: '/product',
		method: 'POST',
		data
	})
}

export function updateProduct(data) {
	return axios({
		url: '/product',
		method: 'PUT',
		data
	})
}

export function deleteProduct(id) {
	return axios({
		url: '/product',
		method: 'DELETE',
		params: {
			id
		}
	})
}

export function getProductImagesByPid(pid) {
	return axios({
		url: '/productimage-pid',
		method: 'GET',
		params: {
			pid
		}
	})
}

export function addProductimage(data) {
	return axios({
		url: '/productimage',
		method: 'POST',
		data
	})
}

export function updateProductimage(data) {
	return axios({
		url: '/productimage',
		method: 'PUT',
		data
	})
}

export function deleteProductimage(id) {
	return axios({
		url: '/productimage',
		method: 'DELETE',
		params: {
			id
		}
	})
}

export function getPropertyValueList(pid) {
	return axios({
		url: '/edit-pv',
		method: 'GET',
		params: {
			pid
		}
	})
}

export function updatePropertyValue(data) {
	return axios({
		url: '/update-pv',
		method: 'POST',
		data
	})
}

export function getUsers(params) {
	return axios({
		url: '/user',
		method: 'GET',
		params
	})
}
