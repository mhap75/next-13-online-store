import { NextResponse } from "next/server";

export async function middleware(req) {
	const url = req.url;
	const pathname = req.nextUrl.pathname;

	if (pathname.startsWith("/profile")) {
		let cookieStr = "";
		req.cookies.getAll().forEach((cookie) => {
			cookieStr += `${cookie.name}=${cookie.value}; `;
		});

		const { data } = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
			{
				method: "GET",
				credentials: "include",
				headers: {
					Cookie: cookieStr,
				},
			}
		).then((res) => res.json());
		const { user } = data || {};
		if (!user) return NextResponse.redirect(new URL("/auth", url));
	} else if (pathname.startsWith("/admin")) {
		let cookieStr = "";
		req.cookies.getAll().forEach((cookie) => {
			cookieStr += `${cookie.name}=${cookie.value}; `;
		});

		const { data } = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
			{
				method: "GET",
				credentials: "include",
				headers: {
					Cookie: cookieStr,
				},
			}
		).then((res) => res.json());
		const { user } = data || {};
		if (!user) return NextResponse.redirect(new URL("/auth", url));
		if (user && user.role !== "ADMIN")
			return NextResponse.redirect(new URL("/", req.url));
	}
}

export const config = {
	matcher: ["/admin:path*", "/profile:path*"],
};
