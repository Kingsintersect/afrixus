import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
			},
			{
				protocol: "https",
				hostname: "api.afrixus.org",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000", // optional but more precise
			},
		],
	},
};

export default nextConfig;
