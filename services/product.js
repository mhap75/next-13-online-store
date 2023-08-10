import http from "./http";

export function getProductList(qs = "", cookies = null) {
	return http
		.get(`/product/list?${qs}`, {
			headers: {
				Cookie: cookies,
			},
		})
		.then(({ data }) => data.data);
	// return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${qs}`, {
	// 	cache: "no-store",
	// })
	// 	.then((response) => response.json())
	// 	.then(({ data }) => data);
}

export function getProduct(slug) {
	return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getPaymentsList() {
	return http.get(`/admin/payment/list`).then(({ data }) => data.data);
}

export function getCouponsList() {
	return http.get(`/admin/coupon/list`).then(({ data }) => data.data);
}

export function addToCart(productId) {
	return http.post(`/cart/add`, { productId }).then(({ data }) => data.data);
}

export function remFromCart(productId) {
	return http
		.post(`/cart/remove`, { productId })
		.then(({ data }) => data.data);
}

export function like(productId) {
	return http
		.post(`/product/like/${productId}`)
		.then(({ data }) => data.data);
}

export function getProductByID(productId) {
	return http
		.get(`/product/${productId}`)
		.then(({ data }) => data.data);
}

export function getCategoryByID(categoryId) {
	return http
		.get(`/category/${categoryId}`)
		.then(({ data }) => data.data);
}

export function createPayment() {
	return http.post(`/payment/create`).then(({ data }) => data.data);
}

export function addNewCoupon(data) {
	return http.post(`/admin/coupon/add`, data).then(({ data }) => data.data);
}

export function addNewProduct(data) {
	return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}

export function addNewCategory(data) {
	return http.post(`admin/category/add`, data).then(({ data }) => data.data);
}

export function editProduct({productId, data}) {
	return http.patch(`/admin/product/update/${productId}`, data).then(({ data }) => data.data);
}

export function editCategory({ id, data }) {
	return http.patch(`/admin/category/update/${id}`, data).then(({ data }) => data.data);
}

export function deleteProduct(id) {
	return http.delete(`/admin/product/remove/${id}`).then(({ data }) => data.data);
}

export function deleteCategory(id) {
	return http.delete(`/admin/category/update/${id}`).then(({ data }) => data.data);
}

export function deleteCoupon(id) {
	return http.delete(`/admin/coupon/remove/${id}`).then(({ data }) => data.data);
}