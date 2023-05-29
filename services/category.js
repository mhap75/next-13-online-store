import http from "./http";

export function getCatList() {
	return http.get("/category/list");
}
