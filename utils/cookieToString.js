export function cookieToString(cookies) {
	let cookieStr = "";
	cookies.getAll().forEach((cookie) => {
		cookieStr += `${cookie.name}=${cookie.value}; `;
	});
	return cookieStr;
}
