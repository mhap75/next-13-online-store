import http from "./http";

export function getProductList(qs = "") {
	return http.get(`/product/list?${qs}`).then(({ data }) => data.data);
	// return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${qs}`, {
	// 	cache: "no-store",
	// })
	// 	.then((response) => response.json())
	// 	.then(({ data }) => data);
}

export function getProduct(slug) {
	return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function addToCart(productId) {
	return http.post(`/cart/add`, { productId }).then(({ data }) => data.data);
}

export function remFromCart(productId) {
	return http
		.post(`/cart/remove`, { productId })
		.then(({ data }) => data.data);
}
