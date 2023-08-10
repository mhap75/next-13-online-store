"use client";

import robotoFont from "@/constants/localFonts";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";
import { ConfigProvider } from "antd";
import SideBar from "./SideBar";

export const metadata = {
	title: "Admin website",
	description: "Admin website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${robotoFont.variable} font-sans bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-200`}
			>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "#058dc7",
						},
					}}
				>
					<Providers>
						<main className="container md:max-w-screen-2xl grid grid-cols-4 h-screen">
							<section className="col-span-1 overflow-y-auto">
								<SideBar />
							</section>
							<section className="col-span-3 overflow-y-auto">
								{children}
							</section>
						</main>
					</Providers>
					<Toaster />
				</ConfigProvider>
			</body>
		</html>
	);
}
