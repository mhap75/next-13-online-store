"use client";

import robotoFont from "@/constants/localFonts";
import "../globals.css";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";
import { ConfigProvider } from "antd";

export const metadata = {
	title: "Admin website",
	description: "Admin website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${robotoFont.variable} font-sans`}
			>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "#058dc7",
						},
					}}
				>
					<Providers>
						<main className="container">{children}</main>
					</Providers>
					<Toaster />
				</ConfigProvider>
			</body>
		</html>
	);
}
