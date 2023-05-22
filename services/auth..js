import http from "./http";

export function getOtp(phoneNumber) {
	return http.post("/user/get-otp", { phoneNumber });
}
