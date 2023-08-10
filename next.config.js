/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
	images: {
		domains: ["store.storeimages.cdn-apple.com", "images.samsung.com", "www.samsung.com"],
	},
};

module.exports = nextConfig;
