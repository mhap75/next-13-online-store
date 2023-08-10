import http from "./http";

export function getOtp(phoneNumber) {
	return http.post("/user/get-otp", { phoneNumber });
}

export function checkOtp(data) {
	return http.post("/user/check-otp", data);
}

export function compProfile(data) {
	return http.post("/user/complete-profile", data);
}

export function persistUser(data) {
	return http.get("/user/profile", data);
}

export function updateProfile(data) {
	return http.patch("/user/update", data);
}

export function logout() {
	return http.post("/user/logout");
}

export function getUsersList(data) {
	return http.get("/admin/user/list", data);
}
