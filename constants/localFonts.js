import LocalFont from "next/font/local";
const robotoFont = LocalFont({
	src: [
		{
			path: "../public/fonts/roboto/Roboto-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/roboto/Roboto-LightItalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../public/fonts/roboto/Roboto-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/roboto/Roboto-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/roboto/Roboto-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/roboto/Roboto-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/fonts/roboto/Roboto-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/roboto/Roboto-Italic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "../public/fonts/roboto/Roboto-Black.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../public/fonts/roboto/Roboto-BlackItalic.woff2",
			weight: "900",
			style: "italic",
		},
	],
	variable: "--font-roboto",
	style: "normal",
	display: "block",
});

export default robotoFont;
